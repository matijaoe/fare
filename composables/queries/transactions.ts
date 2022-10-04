import type { Prisma, Transaction, User } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Ref } from 'vue'

const keys = {
  all: ['transactions'] as const,
  allTime: () => [...keys.all, 'all-time'] as const,
  ranges: () => [...keys.all, 'range'] as const,
  range: (start: Ref<string | undefined>, end: Ref<string | undefined>) => [...keys.all, 'range', start, end] as const,
  details: () => [...keys.all, 'detail'] as const,
  detail: (id: Ref<string>) => [...keys.all, 'detail', id] as const,
}

export const useTransaction = (id: Ref<string>) =>
  useQuery(keys.detail(id), () => $fetch<Transaction>(`/api/transactions/${id.value}`))

export const useTransactions = (start: Ref<string | undefined>, end: Ref<string | undefined>) => {
  return useQuery<Transaction[]>(
    keys.range(start, end),
    () => {
      const fullRangeDefined = isDefined(start) && isDefined(end)
      const url = fullRangeDefined
        ? `/api/transactions?start=${start.value}&end=${end.value}`
        : '/api/transactions'

      return $fetch<Transaction[]>(url)
    },
  )
}

export const useTransactionCreate = () => {
  const queryClient = useQueryClient()

  return useMutation((body: Prisma.TransactionUncheckedCreateWithoutUserInput) => $fetch<User>('/api/transactions', { method: 'POST', body }), {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ranges())
    },
  })
}
