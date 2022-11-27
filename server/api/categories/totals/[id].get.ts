import type { TransactionType } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import type { CategoryTotalType, GroupedCategory } from '~~/models/resources'
import { getDateRange, readParams, readUserId, sendCustomError } from '~~/server/utils'

const initalTotal = () => ({ income: 0, expense: 0, net: 0, totalNet: 0 })

const calculateCategoryTotals = (grupedCategories: GroupedCategory[]) => {
  return grupedCategories
    .reduce((totals: Record<string, Record<CategoryTotalType, number>>, curr: GroupedCategory) => {
      const isType = (type: TransactionType) => curr.type === type

      const ensureInitialTotals = (id: string) => {
        const hasDefinedTotals = totals[id]
        if (!hasDefinedTotals) {
          totals[id] = initalTotal()
        }
      }

      const addSum = (id: string, type: CategoryTotalType) => {
        ensureInitialTotals(id)
        totals[id][type] += curr._sum.amount ?? 0
      }

      if (isType('Expense') && curr.categoryId) {
        addSum(curr.categoryId, 'expense')
      } else if (isType('Income') && curr.categoryId) {
        addSum(curr.categoryId, 'income')
      }

      return totals
    }, {})
}

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  const { id: categoryIdParam } = readParams<{ id: string }>(event)

  const { prismaRangeQuery: date, hasDefinedMonth } = getDateRange(event)

  const groupedCategoriesAllTime = await db.transaction.groupBy({
    by: ['categoryId', 'type'],
    _sum: { amount: true },
    orderBy: { categoryId: 'asc' },
    where: {
      categoryId: categoryIdParam,
      userId,
      type: { not: 'Transfer' },
    },
  })

  const groupedCategoriesInRange = hasDefinedMonth
    ? await db.transaction.groupBy({
      by: ['categoryId', 'type'],
      _sum: { amount: true },
      orderBy: { categoryId: 'asc' },
      where: {
        categoryId: categoryIdParam,
        date,
        userId,
        type: { not: 'Transfer' },
      },
    })
    : null

  const totalsAllTime = calculateCategoryTotals(groupedCategoriesAllTime)
  const totalsInRange = groupedCategoriesInRange ? calculateCategoryTotals(groupedCategoriesInRange) : null

  const isForRange = hasDefinedMonth && totalsInRange

  // For every category, construct object with totals
  const calcCategoryTotals = () => {
    const hadTransactionsAllTime = categoryIdParam in totalsAllTime
    const hasTransactionInRange = isForRange && categoryIdParam in totalsInRange

    if (!hadTransactionsAllTime) {
      return {
        id: categoryIdParam,
        totals: initalTotal(),
      }
    }

    const totalNet = totalsAllTime[categoryIdParam].income - totalsAllTime[categoryIdParam].expense

    const ensuredTotalsInRange = hasTransactionInRange ? totalsInRange[categoryIdParam] : initalTotal()

    const totals = isForRange
      ? {
          ...ensuredTotalsInRange,
          net: ensuredTotalsInRange.income - ensuredTotalsInRange.expense,
          totalNet,
        }
      : {
          ...totalsAllTime[categoryIdParam],
          net: totalNet,
          totalNet,
        }

    return {
      id: categoryIdParam,
      totals,
    }
  }

  const singleCategoryWithTotals = calcCategoryTotals()

  return singleCategoryWithTotals
})
