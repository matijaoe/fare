import { LedgerEntryType } from '@prisma/client'
import { sendInternalError } from '~~/composables/api'
import type { AccountTotalType, groupedAccount } from '~~/models/resources/account'
import { prisma } from '~~/prisma'

const initalTotal = () => ({ income: 0, expense: 0, transferIn: 0, transferOut: 0, net: 0, transferNet: 0, balance: 0 })

export default defineEventHandler(async (event) => {
  const { id: requestedAccountId } = event.context.params
  try {
    // Group by accounts and entry types
    const groupByAccounts = await prisma.ledger.groupBy({
      by: ['fromAccountId', 'toAccountId', 'type'],
      _sum: {
        amount: true,
      },
      orderBy: {
        fromAccountId: 'asc',
      },
      where: {
        OR: [
          { fromAccountId: requestedAccountId },
          { toAccountId: requestedAccountId },
        ],
      },
    })

    const cashAccount = await prisma.cashAccount.findFirst({
      include: {
        account: true,
        paymentFromAccount: true,
        paymentToAccount: true,
      },
      where: {
        id: requestedAccountId,
      },
    })

    if (!cashAccount) {
      throw new Error('Account not found')
    }

    const totals = groupByAccounts.reduce((totalsByAccount: Record<string, Record<AccountTotalType, number>>, curr: groupedAccount) => {
      const isType = (type: LedgerEntryType) => curr.type === type

      const setupInitialAccountValues = (key: string) => {
        if (!totalsByAccount[key]) {
          totalsByAccount[key] = initalTotal()
        }
      }

      const addTransaction = (key: string, type: AccountTotalType) => {
        setupInitialAccountValues(key)
        totalsByAccount[key][type] += curr._sum.amount ?? 0
      }

      if (isType(LedgerEntryType.Transfer)) {
        if (curr.fromAccountId) {
          addTransaction(cashAccount.id, 'transferOut')
        } else if (curr.toAccountId) {
          addTransaction(cashAccount.id, 'transferIn')
        }
      } else if (isType(LedgerEntryType.Expense)) {
        addTransaction(cashAccount.id, 'expense')
      } else if (isType(LedgerEntryType.Income)) {
        addTransaction(cashAccount.id, 'income')
      }

      return totalsByAccount
    }, {})

    const accountTotals = totals[cashAccount.id] ?? initalTotal()
    accountTotals.net = accountTotals.income - accountTotals.expense
    accountTotals.transferNet = accountTotals.transferIn - accountTotals.transferOut
    accountTotals.balance = accountTotals.net + accountTotals.transferNet

    return {
      ...cashAccount,
      totals: accountTotals,
    }
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
