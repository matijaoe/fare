import type { Category, Prisma, Transaction } from '@prisma/client'

const initalTotal = { income: 0, expense: 0, net: 0, totalNet: 0 }

export type CategoryWithCount = Category & { _count: Prisma.CategoryCountOutputType }

export type CategoryWithTransactions = Category & { transactions: Transaction[] }

export type CategoryTotalType = keyof typeof initalTotal

export type CategoryTotals = Record<CategoryTotalType, number>

export type CategoryWithTotals = CategoryWithCount & {
  totals: CategoryTotals
}

export type GroupedCategory = (Prisma.PickArray<Prisma.TransactionGroupByOutputType, ('type' | 'categoryId')[]> & {
  _sum: {
    amount: number | null
  }
})
