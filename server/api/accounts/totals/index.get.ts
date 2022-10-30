import type { TransactionType } from '@prisma/client'
import { sendInternalError, useContextUserId, useTransactionDateRange } from '~~/composables/server'
import type { AccountTotalType, CashAccountWithTotals, GroupedAccount } from '~~/models/resources/account'
import { prisma } from '~~/prisma'

const initalTotal = () => ({ income: 0, expense: 0, net: 0, transferIn: 0, transferOut: 0, transferNet: 0, balance: 0 })

const calculateAccountTotals = (groupedAccounts: GroupedAccount[]) => {
  return groupedAccounts
    .map((account: GroupedAccount) => ({
      ...account,
      totals: initalTotal(),
    }))
    .reduce((totals: Record<string, Record<AccountTotalType, number>>, curr: GroupedAccount) => {
      const isType = (type: TransactionType) => curr.type === type

      const ensureInitialTotals = (id: string) => {
        const hasDefinedTotals = totals[id]
        if (!hasDefinedTotals) {
          totals[id] = initalTotal()
        }
      }

      const addSum = (id: string, type: AccountTotalType) => {
        ensureInitialTotals(id)
        totals[id][type] += curr._sum.amount ?? 0
      }

      if (isType('Transfer') && curr.fromAccountId && curr.toAccountId && curr.fromAccountId !== curr.toAccountId) {
        addSum(curr.fromAccountId, 'transferOut')
        addSum(curr.toAccountId, 'transferIn')
      } else if (isType('Expense') && curr.fromAccountId && !curr.toAccountId) {
        addSum(curr.fromAccountId, 'expense')
      } else if (isType('Income') && curr.toAccountId && !curr.fromAccountId) {
        addSum(curr.toAccountId, 'income')
      }

      return totals
    }, {})
}

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  const { dateQuery: date, hasDefinedRange } = useTransactionDateRange(event)

  try {
    // Group by accounts and entry types
    const groupedAccountsAllTime = await prisma.transaction.groupBy({
      by: ['fromAccountId', 'toAccountId', 'type'],
      _sum: { amount: true },
      orderBy: { fromAccountId: 'asc' },
      where: { userId },
    })

    const groupedAccountsInRange = hasDefinedRange
      ? await prisma.transaction.groupBy({
        by: ['fromAccountId', 'toAccountId', 'type'],
        _sum: { amount: true },
        orderBy: { fromAccountId: 'asc' },
        where: { date, userId },
      })
      : null

    const totalsFullTime = calculateAccountTotals(groupedAccountsAllTime)
    const totalsInRange = groupedAccountsInRange ? calculateAccountTotals(groupedAccountsInRange) : null

    // Fetch all cash accounts - could this better be done from client and pinia store/vue query?
    const cashAccounts = await prisma.cashAccount.findMany({})

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

