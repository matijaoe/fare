import type { MoneyAccount, Prisma, Transaction } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import type { Ref } from 'vue'
import type { TransactionTotalMonthlyObject, TransactionsTotalsPerRange } from '~~/models/resources/transaction'

export const keysTransactions = {
  all: ['transactions'] as const,
  // Ranges
  ranges: () => [...keysTransactions.all, 'range'] as const,
  range: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysTransactions.all, 'range', from, to] as const,
  // Totals
  totals: () => [...keysTransactions.all, 'totals'] as const,
  total: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysTransactions.all, 'totals', from, to] as const,
  // Details
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
    // { initialData: () => useCachedPayload<Transaction[]>(`transactions-${get(from)}-${get(to)}`) ?? [] },
  )

export const useTransactionCreate = () => {
  const qc = useQueryClient()

  return useMutation((body: Prisma.TransactionUncheckedCreateInput) => $fetch<Transaction>('/api/transactions', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
      qc.invalidateQueries(keysTransactions.ranges())
      qc.invalidateQueries(keysTransactions.totals())
    },
  })
}

export const useTransactionUpdate = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.TransactionUncheckedUpdateInput) =>
    $fetch<MoneyAccount>(`/api/transactions/${get(id)}`, {
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
  return useMutation(({ userId }: { userId: string }) =>
    $fetch<MoneyAccount>(`/api/transactions/${get(id)}`, {
      method: 'DELETE',
      body: { userId },
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
      qc.invalidateQueries(keysTransactions.all)
    },
  })
}

export const useTransactionTotalsPerRange = (from: Ref<string | undefined>, to: Ref<string | undefined>) => useQuery(
  keysTransactions.total(from, to),
  () => {
    const fullRangeDefined = isDefined(from) && isDefined(to)
    const url = fullRangeDefined
      ? `/api/transactions/totals?from=${get(from)}&to=${get(to)}`
      : '/api/transactions/totals'

    return $fetch<TransactionsTotalsPerRange>(url)
  },
  // { initialData: () => useCachedPayload<TransactionsTotalsPerRange>(`transactions-totals-${get(from)}-${get(to)}`) },

)

export const useTransactionTotalMonthly = () => useQuery(
  keysTransactions.totals(),
  () => $fetch<TransactionTotalMonthlyObject>('/api/transactions/totals/monthly'),
)

