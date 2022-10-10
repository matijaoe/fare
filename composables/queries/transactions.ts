import type { Prisma, Transaction, User } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'

const keys = {
  all: ['transactions'] as const,
  allTime: () => [...keys.all, 'all-time'] as const,
  ranges: () => [...keys.all, 'range'] as const,
  range: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keys.all, 'range', from, to] as const,
  details: () => [...keys.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keys.all, 'detail', id] as const,
}

export const useTransaction = (id: MaybeRef<string>) =>
  useQuery(keys.detail(id), () => $fetch<Transaction>(`/api/transactions/${unref(id)}`))

export const useTransactions = (from: Ref<string | undefined>, to: Ref<string | undefined>) =>
  useQuery<Transaction[]>(
    keys.range(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/transactions?from=${from.value}&to=${to.value}`
        : '/api/transactions'

      return $fetch<Transaction[]>(url)
    },
  )

export const useTransactionCreate = () => {
  const qc = useQueryClient()

  return useMutation((body: Prisma.TransactionUncheckedCreateWithoutUserInput) => $fetch<User>('/api/transactions', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keys.ranges())
    },
  })
}
