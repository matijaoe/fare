import type { Ledger } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useCategories = () => useQuery('categories', () => $fetch<Ledger[]>('/api/categories'))
