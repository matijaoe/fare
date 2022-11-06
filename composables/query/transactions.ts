import type { Account, Prisma, Transaction } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import type { Ref } from 'vue'
import type { TransactionMonyhlyTotalObject } from '~~/models/resources/transaction'

const keysTransactions = {
  all: ['transactions'] as const,
  allTime: () => [...keysTransactions.all, 'all-time'] as const,
  ranges: () => [...keysTransactions.all, 'range'] as const,
  range: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysTransactions.all, 'range', from, to] as const,
  totals: () => [...keysTransactions.all, 'totals'] as const,
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
        ? `/api/transactions?from=${get(from)}&to=${get(to)}`
        : '/api/transactions'

      return $fetch<Transaction[]>(url)
    },
    { initialData: () => useCachedPayload<Transaction[]>(`transactions-${get(from)}-${get(to)}`) ?? [] },
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
    $fetch<Account>(`/api/transactions/${get(id)}`, {
      method: 'PATCH',
      body,
    }), {
    onSuccess: async () => {
      await Promise.all([
        qc.invalidateQueries(keysAccounts.all),
        qc.invalidateQueries(keysTransactions.all),
      ])
    },
  })
}

export const useTransactionDelete = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation(() =>
    $fetch<Account>(`/api/transactions/${get(id)}`, {
      method: 'DELETE',
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
      qc.invalidateQueries(keysTransactions.all)
    },
  })
}

export const useTransactionMonthlyTotals = () => useQuery(
  keysTransactions.totals(),
  () => $fetch<TransactionMonyhlyTotalObject>('/api/transactions/totals/monthly'),
)
