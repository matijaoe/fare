import type { Category } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useCategories = () => useQuery('categories', () => $fetch<Category[]>('/api/categories'))
