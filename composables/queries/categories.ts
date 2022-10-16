import type { Category } from '@prisma/client'
import { useQuery } from '@tanstack/vue-query'

export const categoryKeys = {
  all: ['categories'] as const,
  details: () => [...categoryKeys.all, 'detail'] as const,
  detail: (id: string) => [...categoryKeys.all, 'detail', id] as const,
}

export const useCategories = () => useQuery(categoryKeys.all, () => $fetch<Category[]>('/api/categories'))

export const useCategory = (id: string) => useQuery(categoryKeys.detail(id), () => $fetch<Category[]>(`/api/categories/${id}`))
