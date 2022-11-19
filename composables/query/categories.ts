import type { Category, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { get } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import type { Ref } from 'vue'
import type { CategoryWithTotals } from '~~/models/resources/category'

export const keysCategory = {
  all: ['categories'] as const,
  totals: () => [...keysCategory.all, 'totals'] as const,
  totalsRanges: () => [...keysCategory.all, 'totals', 'range'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysCategory.all, 'totals', 'range', from, to] as const,
  details: () => [...keysCategory.all, 'detail'] as const,
  detail: (id: string) => [...keysCategory.all, 'detail', id] as const,
}

export const useCategories = () => useQuery(keysCategory.all,
  () => $fetch<Category[]>('/api/categories'),
  { initialData: () => useCachedPayload<Category[]>('categories') },
)

export const useCategory = (id: string) => useQuery(keysCategory.detail(id),
  () => $fetch<Category>(`/api/categories/${id}`),
  { initialData: () => useCachedPayload<Category>(`category-${id}`) },
)

export const useCategoriesTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) => {
  return useQuery(
    keysCategory.totalsRange(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/categories/totals?from=${get(from)}&to=${get(to)}`
        : '/api/categories/totals'

      return $fetch<CategoryWithTotals[]>(url)
    },
    { initialData: () => useCachedPayload<CategoryWithTotals[]>(`categories-totals-${get(from)}-${get(to)}`) },
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

export const useCategoryDelete = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation(({ userId }: { userId: string }) =>
    $fetch<{ count: number }>(`/api/categories/${get(id)}`, {
      method: 'DELETE',
      body: { userId },
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}
