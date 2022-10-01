import { useQuery } from 'vue-query'
import type { Transaction } from '@prisma/client'

export const useExpenses = () => useQuery('expenses', () => $fetch<Transaction[]>('/api/transactions/expenses'))
