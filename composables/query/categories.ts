import type { Category, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import { keysTransactions } from './transactions'
import type { CategoryWithCount, CategoryWithTotals, CategoryWithTransactions } from '~~/models/resources/category'

export const keysCategory = {
  all: ['categories'] as const,
  // totals
  totals: () => [...keysCategory.all, 'totals'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysCategory.all, 'totals', from, to] as const,
  // details
  details: () => [...keysCategory.all, 'detail'] as const,
  detail: (id: string) => [...keysCategory.all, 'detail', id] as const,
  // details with transactions
  detailsWithRange: () => [...keysCategory.all, 'detail', 'transactions'] as const,
  detailWithRange: (id: string, from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysCategory.all, 'detail', 'transactions', id, from, to] as const,
}

export const useCategories = () => useQuery(keysCategory.all,
  () => $fetch<CategoryWithCount[]>('/api/categories'),
)

export const useCategory = (id: string) => useQuery(keysCategory.detail(id),
  () => $fetch<Category>(`/api/categories/${id}`),
)

export const useCategoryWithTransactions = (id: string, from: Ref<string | undefined>, to: Ref<string | undefined>) => useQuery(
  keysCategory.detailWithRange(id, from, to),
  () => {
    const fullRangeDefined = isDefined(from) && isDefined(to)
    const url = fullRangeDefined
      ? `/api/categories/${id}?transactions=true&from=${get(from)}&to=${get(to)}`
      : `/api/categories/${id}?transactions=true`

    return $fetch<CategoryWithTransactions>(url)
  },
)

export const useCategoriesTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) => useQuery(
  keysCategory.totalsRange(from, to),
  () => {
    const fullRangeDefined = isDefined(from) && isDefined(to)
    const url = fullRangeDefined
      ? `/api/categories/totals?from=${get(from)}&to=${get(to)}`
      : '/api/categories/totals'

    return $fetch<CategoryWithTotals[]>(url)
  },
)

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
      qc.invalidateQueries(keysTransactions.all)
    },
  })
}
