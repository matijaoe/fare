import type { Transaction } from '@prisma/client'
import { useQuery } from 'vue-query'
import type { CashAccountsQueryModel } from '~~/models/resources/account'

export const useTransactions = (params: CashAccountsQueryModel) => useQuery('transactions', () => $fetch<Transaction[]>('/api/transactions', {
  params,
}))
