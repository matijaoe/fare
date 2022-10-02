import type { Transaction } from '@prisma/client'
import { useQuery } from 'vue-query'
import type { DateRange } from '~~/models/resources/account'

export const useTransactions = (params: DateRange) => useQuery('transactions', () => $fetch<Transaction[]>('/api/transactions', {
  params,
}))
