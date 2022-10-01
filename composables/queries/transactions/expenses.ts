import type { Ledger } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useExpenses = () => useQuery('ledger-entries', () => $fetch<Ledger[]>('/api/ledger/expenses'))
