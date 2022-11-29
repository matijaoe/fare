import type { Category, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import { keysTransactions } from './transactions'
import type { CategoryWithCount, CategoryWithTotals, CategoryWithTransactions, IndividualCategoryTotals, TransactionWithCategoryAndCashAccount } from '~~/models/resources'

export const keysCategory = {
  all: ['categories'] as const,
  // totals
  totals: () => [...keysCategory.all, 'totals'] as const,
  totalsRange: (month: Ref<string | undefined>) => [...keysCategory.all, 'totals', month] as const,
  totalsIndividualRange: (id: string, month: Ref<string | undefined>) => [...keysCategory.all, 'totals', id, month] as const,
  // details
  details: () => [...keysCategory.all, 'detail'] as const,
  detail: (id: string) => [...keysCategory.all, 'detail', id] as const,
  // details with transactions
  detailsWithRange: () => [...keysCategory.all, 'detail', 'transactions'] as const,
  detailWithRange: (id: string, month: Ref<string | undefined>) => [...keysCategory.all, 'detail', 'transactions', id, month] as const,
}

export const useCategories = () => useQuery(keysCategory.details(),
  () => $fetch<CategoryWithCount[]>('/api/categories'),
)

export const useCategory = (id: string) => {
  const qc = useQueryClient()
  return useQuery(keysCategory.detail(id),
    () => $fetch<Category>(`/api/categories/${id}`),
    {
      initialData: () => {
        return qc.getQueryData<CategoryWithCount[]>(keysCategory.details())?.find(c => c.id === id)
      },
    },
  )
}

export const useCategoryWithTransactions = (id: string, month: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useQuery(
    keysCategory.detailWithRange(id, month),
    () => {
      const url = isDefined(month)
        ? `/api/categories/${id}?transactions=true&month=${get(month)}`
        : `/api/categories/${id}?transactions=true`

      return $fetch<CategoryWithTransactions>(url)
    },
    {
      initialData: () => {
        const category = qc.getQueryData<CategoryWithCount[]>(keysCategory.details())?.find(c => c.id === id) ?? {}
        const allTransactions = qc.getQueryData<TransactionWithCategoryAndCashAccount[]>(keysTransactions.range(month))

        if (!allTransactions) {
          return undefined
        }

        const transactions = allTransactions.filter(t => t.categoryId === id)

        return {
          ...category,
          transactions,
        }
      },
    },
  )
}

export const useCategoriesTotals = (month: Ref<string | undefined>) => {
  return useQuery(
    keysCategory.totalsRange(month),
    () => {
      const url = isDefined(month)
        ? `/api/categories/totals?month=${get(month)}`
        : '/api/categories/totals'

      return $fetch<CategoryWithTotals[]>(url)
    },
  )
}

export const useCategoryTotals = (id: string, month: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useQuery(
    keysCategory.totalsIndividualRange(id, month),
    () => {
      const url = isDefined(month)
        ? `/api/categories/totals/${id}?month=${get(month)}`
        : `/api/categories/totals/${id}`

      return $fetch<IndividualCategoryTotals>(url)
    },
    {
      initialData: () => {
        return qc.getQueryData<CategoryWithTotals[]>(keysCategory.totalsRange(month))?.find(c => c.id === id)
      },
    },
  )
}

export const useCategoryCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.CategoryUncheckedCreateInput) => $fetch<Category>('/api/categories', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysCategory.all)
    },
  })
}

export const useCategoryUpdate = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.CategoryUncheckedUpdateManyInput) =>
    $fetch<{ count: number }>(`/api/categories/${get(id)}`, {
      method: 'PATCH',
      body,
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysCategory.all)
    },
  })
}

export const useCategoryDelete = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation(({ userId }: { userId: string }) =>
    $fetch<{ count: number }>(`/api/categories/${get(id)}`, {
      method: 'DELETE',
      body: { userId },
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysCategory.all)
    },
  })
}
