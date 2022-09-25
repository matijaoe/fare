import type { Ledger } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useCategories = () => useQuery('ledger-categories', () => $fetch<Ledger[]>('/api/ledger/categories'))
