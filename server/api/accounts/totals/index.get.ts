import type { TransactionType } from '@prisma/client'
import { sendInternalError, useContextUserId, useTransactionDateRange } from '~~/composables/server'
import type { AccountTotalType, CashAccountWithAccount, CashAccountWithTotals, GroupedAccount } from '~~/models/resources/account'
import { prisma } from '~~/prisma'

const initalTotal = () => ({ income: 0, expense: 0, net: 0, transferIn: 0, transferOut: 0, transferNet: 0, balance: 0 })

const calculateAccountTotals = (groupedAccounts: GroupedAccount[], cashAccounts: CashAccountWithAccount[]) => {
  const findAccount = (id: string | null) => cashAccounts.find(a => id === a.id)

  return groupedAccounts.reduce((totalsByAccount: Record<string, Record<AccountTotalType, number>>, curr: GroupedAccount) => {
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

    if (isType('Transfer') && fromAccount && toAccount && fromAccount !== toAccount) {
      addTransaction(fromAccount.id, 'transferOut')
      addTransaction(toAccount.id, 'transferIn')
    } else if (isType('Expense') && fromAccount && !toAccount) {
      addTransaction(fromAccount.id, 'expense')
    } else if (isType('Income') && toAccount && !fromAccount) {
      addTransaction(toAccount.id, 'income')
    }

    return totalsByAccount
  }, {})
}

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  const { dateQuery: date, hasDefinedRange } = useTransactionDateRange(event)

  try {
    // Group by accounts and entry types
    const groupByAccountsAllTime = await prisma.transaction.groupBy({
      by: ['fromAccountId', 'toAccountId', 'type'],
      _sum: { amount: true },
      orderBy: { fromAccountId: 'asc' },
      where: { userId },
    })

    const groupByAccountsRange = hasDefinedRange
      ? await prisma.transaction.groupBy({
        by: ['fromAccountId', 'toAccountId', 'type'],
        _sum: { amount: true },
        orderBy: { fromAccountId: 'asc' },
        where: { date, userId },
      })
      : null

    // Fetch all cash accounts - could this better be done from client and pinia store/vue query?
    const cashAccounts = await prisma.cashAccount.findMany({
      include: {
        account: true,
      },
    })
    const totalsFullTime = calculateAccountTotals(groupByAccountsAllTime, cashAccounts)
    const totalsInRange = groupByAccountsRange ? calculateAccountTotals(groupByAccountsRange, cashAccounts) : null

    // Totals for all time - net, expenses, income, transfer net, balance
    const cashAccountsWithTotals: CashAccountWithTotals[] = cashAccounts.map((account) => {
      let totals = initalTotal()

      const allTimeAccountTotals = totalsFullTime[account.id] ?? initalTotal()

      const allTimeNet = allTimeAccountTotals.income - allTimeAccountTotals.expense
      const allTimeTransferNet = allTimeAccountTotals.transferIn - allTimeAccountTotals.transferOut

      // All time balance could be wrong
      const allTimeBalance = allTimeNet + allTimeTransferNet

      if (totalsInRange) {
        const inRangeAccountTotals = totalsInRange[account.id] ?? initalTotal()

        const inRangeNet = inRangeAccountTotals.income - inRangeAccountTotals.expense
        const inRangeTransferNet = inRangeAccountTotals.transferIn - inRangeAccountTotals.transferOut

        // Overwrite everthing for defined range, except global balance
        totals = {
          income: inRangeAccountTotals.income,
          expense: inRangeAccountTotals.expense,
          transferIn: inRangeAccountTotals.transferIn,
          transferOut: inRangeAccountTotals.transferOut,
          net: inRangeNet,
          transferNet: inRangeTransferNet,
          balance: allTimeBalance,
        }
      } else {
        totals = {
          income: allTimeAccountTotals.income,
          expense: allTimeAccountTotals.expense,
          transferIn: allTimeAccountTotals.transferIn,
          transferOut: allTimeAccountTotals.transferOut,
          net: allTimeNet,
          transferNet: allTimeTransferNet,
          balance: allTimeBalance,
        }
      }

      return {
        ...account,
        totals,
        timestamp: Date.now(),
      }
    })

    return cashAccountsWithTotals
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})

