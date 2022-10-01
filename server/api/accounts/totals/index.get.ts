import { TransactionType } from '@prisma/client'
import { sendInternalError } from '~~/composables/server'
import type { AccountTotalType, CashAccountWithTotals, groupedAccount } from '~~/models/resources/account'
import { prisma } from '~~/prisma'

const initalTotal = () => ({ income: 0, expense: 0, transferIn: 0, transferOut: 0, net: 0, transferNet: 0, balance: 0 })

export default defineEventHandler(async (event) => {
  try {
    // Group by accounts and entry types
    const groupByAccounts = await prisma.transaction.groupBy({
      by: ['fromAccountId', 'toAccountId', 'type'],
      _sum: {
        amount: true,
      },
      orderBy: {
        fromAccountId: 'asc',
      },
    })

    // Fetch all cash accounts - could this better be done from client and pinia store/vue query?
    const cashAccounts = await prisma.cashAccount.findMany({
      include: {
        account: true,
      },
    })

    const findAccount = (id: string | null) => cashAccounts.find(a => id === a.id)

    const totals = groupByAccounts.reduce((totalsByAccount: Record<string, Record<AccountTotalType, number>>, curr: groupedAccount) => {
      const fromAccount = findAccount(curr.fromAccountId)
      const toAccount = findAccount(curr.toAccountId)

      if (!fromAccount && !toAccount) {
        return totalsByAccount
      }

      const isType = (type: TransactionType) => curr.type === type

      const setupInitialAccountValues = (key: string) => {
        if (!totalsByAccount[key]) {
          totalsByAccount[key] = initalTotal()
        }
      }

      const addTransaction = (key: string, type: AccountTotalType) => {
        setupInitialAccountValues(key)
        totalsByAccount[key][type] += curr._sum.amount ?? 0
      }

      if (isType(TransactionType.Transfer) && fromAccount && toAccount && fromAccount !== toAccount) {
        addTransaction(fromAccount.id, 'transferOut')
        addTransaction(toAccount.id, 'transferIn')
      } else if (isType(TransactionType.Expense) && fromAccount && !toAccount) {
        addTransaction(fromAccount.id, 'expense')
      } else if (isType(TransactionType.Income) && toAccount && !fromAccount) {
        addTransaction(toAccount.id, 'income')
      }

      return totalsByAccount
    }, {})

    const cashAccountsWithTotals: CashAccountWithTotals[] = cashAccounts.map((account) => {
      const accountTotals = totals[account.id] ?? initalTotal()
      accountTotals.net = accountTotals.income - accountTotals.expense
      accountTotals.transferNet = accountTotals.transferIn - accountTotals.transferOut
      accountTotals.balance = accountTotals.net + accountTotals.transferNet

      return {
        ...account,
        totals: accountTotals,
      }
    })

    return cashAccountsWithTotals
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
