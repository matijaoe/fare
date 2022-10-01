import type { Transaction } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useTransaction = (id: string) => useQuery(['transaction', id], () => $fetch<Transaction[]>(`/api/transactions/${id}`))
