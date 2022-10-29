import type { Account, Prisma, Transaction } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { get } from '@vueuse/core'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'

const keysTransactions = {
  all: ['transactions'] as const,
  allTime: () => [...keysTransactions.all, 'all-time'] as const,
  ranges: () => [...keysTransactions.all, 'range'] as const,
  range: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysTransactions.all, 'range', from, to] as const,
  details: () => [...keysTransactions.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysTransactions.all, 'detail', id] as const,
}

export const useTransaction = (id: MaybeRef<string>) =>
  useQuery(keysTransactions.detail(id), () => $fetch<Transaction>(`/api/transactions/${unref(id)}`))

export const useTransactions = (from: Ref<string | undefined>, to: Ref<string | undefined>) =>
  useQuery<Transaction[]>(
    keysTransactions.range(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/transactions?from=${from.value}&to=${to.value}`
        : '/api/transactions'

      return $fetch<Transaction[]>(url)
    },
    {
      // TODO: disbled bsc of strange behaviour, no inbetween loading states
      // is this still true?
      initialData: () => useFetchedPayload<Transaction[]>(`transactions-${get(from)}-${get(to)}`) ?? [],
    },
  )

export const useTransactionCreate = () => {
  const qc = useQueryClient()

  return useMutation((body: Prisma.TransactionUncheckedCreateWithoutUserInput) => $fetch<Transaction>('/api/transactions', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
      qc.invalidateQueries(keysTransactions.ranges())
    },
  })
}

export const useTransactionUpdate = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.TransactionUpdateWithoutUserInput) =>
    $fetch<Account>(`/api/transactions/${id.value}`, {
      method: 'PATCH',
      body,
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysTransactions.all)
    },
  })
}

export const useTransactionDelete = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation(() =>
    $fetch<Account>(`/api/transactions/${id.value}`, {
      method: 'DELETE',
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}
