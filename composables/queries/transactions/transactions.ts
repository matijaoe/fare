import type { Transaction } from '@prisma/client'
import { useQuery } from 'vue-query'
import type { TimeFrame } from '~~/models/resources/account'

export const useTransactions = (params: TimeFrame) => useQuery('transactions', () => $fetch<Transaction[]>('/api/transactions', {
  params,
}))
