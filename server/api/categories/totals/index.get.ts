import type { TransactionType } from '@prisma/client'
import { useContextUserId, useTransactionDateRange } from '~~/composables/server'
import type { CategoryTotalType, GroupedCategory } from '~~/models/resources/category'
import { prisma } from '~~/prisma'

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
  const userId = useContextUserId(event)
  const { dateQuery: date, hasDefinedRange } = useTransactionDateRange(event)

  const groupedCategoriesAllTime = await prisma.transaction.groupBy({
    by: ['categoryId', 'type'],
    _sum: { amount: true },
    orderBy: { categoryId: 'asc' },
    where: {
      userId,
      type: { not: 'Transfer' },
      //   TODO: how to handle null categories (uncategorized?)
      categoryId: { not: null },
    },
  })

  const groupedCategoriesInRange = hasDefinedRange
    ? await prisma.transaction.groupBy({
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

  const categories = await prisma.category.findMany({})

  const totalsAllTime = calculateCategoryTotals(groupedCategoriesAllTime)
  const totalsInRange = groupedCategoriesInRange ? calculateCategoryTotals(groupedCategoriesInRange) : null

  const isForRange = hasDefinedRange && totalsInRange

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
