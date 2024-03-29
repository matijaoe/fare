import { StatusCodes } from 'http-status-codes'
import type { TransactionType } from '~~/models/enums'
import { db } from '~~/lib/db'
import type { CategoryTotalType, GroupedCategory } from '~~/models/resources'
import { getDateRange, readUserId, sendCustomError } from '~~/server/utils'

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

  const { prismaRangeQuery: date, hasDefinedMonth } = getDateRange(event)

  const groupedCategoriesAllTime = await db.transaction.groupBy({
    by: ['categoryId', 'type'],
    _sum: { amount: true },
    orderBy: { categoryId: 'asc' },
    where: {
      userId,
      type: { not: 'Transfer' },
      //   TODO: handle null categories (uncategorized?)
      categoryId: { not: null },
    },
  })

  const groupedCategoriesInRange = hasDefinedMonth
    ? await db.transaction.groupBy({
      by: ['categoryId', 'type'],
      _sum: { amount: true },
      orderBy: { categoryId: 'asc' },
      where: {
        date,
        userId,
        type: { not: 'Transfer' },
      },
    })
    : null

  const categories = await db.category.findMany({})

  const totalsAllTime = calculateCategoryTotals(groupedCategoriesAllTime)
  const totalsInRange = groupedCategoriesInRange ? calculateCategoryTotals(groupedCategoriesInRange) : null

  const isForRange = hasDefinedMonth && totalsInRange

  // For every category, construct object with totals
  return categories.map((category) => {
    const hadTransactionsAllTime = category.id in totalsAllTime
    const hasTransactionInRange = isForRange && category.id in totalsInRange

    if (!hadTransactionsAllTime) {
      return {
        ...category,
        totals: initalTotal(),
      }
    }

    const totalNet = totalsAllTime[category.id].income - totalsAllTime[category.id].expense

    const ensuredTotalsInRange = hasTransactionInRange ? totalsInRange[category.id] : initalTotal()

    const totals = isForRange
      ? {
          ...ensuredTotalsInRange,
          net: ensuredTotalsInRange.income - ensuredTotalsInRange.expense,
          totalNet,
        }
      : {
          ...totalsAllTime[category.id],
          net: totalNet,
          totalNet,
        }

    return {
      ...category,
      totals,
    }
  })
})
