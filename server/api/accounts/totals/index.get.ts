import { StatusCodes } from 'http-status-codes'
import type { TransactionType } from '~~/models/enums'
import { db } from '~~/lib/db'
import type { AccountTotalType, GroupedAccount } from '~~/models/resources'
import { getDateRange, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'

const initalTotal = () => ({ income: 0, expense: 0, net: 0, transferIn: 0, transferOut: 0, transferNet: 0 })

const calculateAccountTotals = (groupedAccounts: GroupedAccount[]) => {
  return groupedAccounts.reduce((totalsByAccount: Record<string, Record<AccountTotalType, number>>, curr: GroupedAccount) => {
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

    if (isType('Transfer') && curr.fromAccountId && curr.toAccountId && curr.fromAccountId !== curr.toAccountId) {
      addTransaction(curr.fromAccountId, 'transferOut')
      addTransaction(curr.toAccountId, 'transferIn')
    } else if (isType('Expense') && curr.fromAccountId && !curr.toAccountId) {
      addTransaction(curr.fromAccountId, 'expense')
    } else if (isType('Income') && curr.toAccountId && !curr.fromAccountId) {
      addTransaction(curr.toAccountId, 'income')
    }

    return totalsByAccount
  }, {})
}

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  const { prismaRangeQuery: date, hasDefinedMonth } = getDateRange(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    // Group by accounts and entry types
    const groupByAccountsAllTime = await db.transaction.groupBy({
      by: ['fromAccountId', 'toAccountId', 'type'],
      _sum: { amount: true },
      orderBy: { fromAccountId: 'asc' },
      where: { userId },
    })

    const groupByAccountsRange = hasDefinedMonth
      ? await db.transaction.groupBy({
        by: ['fromAccountId', 'toAccountId', 'type'],
        _sum: { amount: true },
        orderBy: { fromAccountId: 'asc' },
        where: { date, userId },
      })
      : null

    const cashAccounts = await db.cashAccount.findMany({})

    const totalsAllTime = calculateAccountTotals(groupByAccountsAllTime)
    const totalsInRange = groupByAccountsRange ? calculateAccountTotals(groupByAccountsRange) : null

    const isForRange = hasDefinedMonth && totalsInRange

    // Totals for all time - net, expenses, income, transfer net
    return cashAccounts.map((cashAccount) => {
      const hadTransactionsAllTime = cashAccount.id in totalsAllTime
      const hasTransactionInRange = isForRange && cashAccount.id in totalsInRange

      if (!hadTransactionsAllTime) {
        return {
          ...cashAccount,
          totals: initalTotal(),
        }
      }

      const allTimeAccountTotals = totalsAllTime[cashAccount.id]

      const totalNet = allTimeAccountTotals.income - allTimeAccountTotals.expense
      const totalTransferNet = allTimeAccountTotals.transferIn - allTimeAccountTotals.transferOut

      const ensuredTotalsInRange = hasTransactionInRange ? totalsInRange[cashAccount.id] : initalTotal()

      const totals = isForRange
        ? {
            ...ensuredTotalsInRange,
            net: ensuredTotalsInRange.income - ensuredTotalsInRange.expense,
            transferNet: ensuredTotalsInRange.transferIn - ensuredTotalsInRange.transferOut,
          }
        : {
            ...allTimeAccountTotals,
            net: totalNet,
            transferNet: totalTransferNet,
          }

      return {
        ...cashAccount,
        totals,
      }
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
