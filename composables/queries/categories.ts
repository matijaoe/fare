import type { Category } from '@prisma/client'
import { useQuery } from '@tanstack/vue-query'

const keys = {
  all: ['categories'] as const,
  details: () => [...keys.all, 'detail'] as const,
  detail: (id: string) => [...keys.all, 'detail', id] as const,
}

export const useCategories = () => useQuery(keys.all, () => $fetch<Category[]>('/api/categories'))

export const useCategory = (id: string) => useQuery(keys.detail(id), () => $fetch<Category[]>(`/api/categories/${id}`))
