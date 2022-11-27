import type { MoneyAccount, Prisma, Transaction } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import type { TransactionTotalMonthlyObject, TransactionWithCategoryAndCashAccount, TransactionsTotalsPerRange } from '~~/models/resources'

export const keysTransactions = {
  all: ['transactions'] as const,
  // Ranges
  ranges: () => [...keysTransactions.all, 'range'] as const,
  range: (month: Ref<string | undefined>) => [...keysTransactions.all, 'range', month] as const,
  // Totals
  totals: () => [...keysTransactions.all, 'totals'] as const,
  total: (month: Ref<string | undefined>) => [...keysTransactions.all, 'totals', month] as const,
  // Details
  details: () => [...keysTransactions.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysTransactions.all, 'detail', id] as const,
}

export const useTransaction = (id: MaybeRef<string>) =>
  useQuery(keysTransactions.detail(id), () => $fetch<Transaction>(`/api/transactions/${unref(id)}`))

export const useTransactions = (month: Ref<string | undefined>) =>
  useQuery(
    keysTransactions.range(month),
    () => {
      const url = isDefined(month)
        ? `/api/transactions?month=${get(month)}`
        : '/api/transactions'

      return $fetch<TransactionWithCategoryAndCashAccount[]>(url)
    },
  )

export const useTransactionCreate = () => {
  const qc = useQueryClient()

  return useMutation((body: Prisma.TransactionUncheckedCreateInput) => $fetch<Transaction>('/api/transactions', { method: 'POST', body }), {
    onSuccess: async () => {
      await Promise.allSettled([
        qc.invalidateQueries(keysTransactions.all),
        qc.invalidateQueries(keysAccounts.detailsWithRange()),
        qc.invalidateQueries(keysCategory.detailsWithRange()),
      ])
      qc.invalidateQueries(keysAccounts.totals())
      qc.invalidateQueries(keysCategory.totals())
      qc.invalidateQueries(keysAccounts.balance())
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
      await Promise.allSettled([
        qc.invalidateQueries(keysTransactions.all),
        qc.invalidateQueries(keysAccounts.detailsWithRange()),
        qc.invalidateQueries(keysCategory.detailsWithRange()),
      ])
      qc.invalidateQueries(keysAccounts.totals())
      qc.invalidateQueries(keysCategory.totals())
      qc.invalidateQueries(keysAccounts.balance())
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
    onSuccess: async () => {
      await Promise.allSettled([
        qc.invalidateQueries(keysTransactions.all),
        qc.invalidateQueries(keysAccounts.detailsWithRange()),
        qc.invalidateQueries(keysCategory.detailsWithRange()),
      ])
      qc.invalidateQueries(keysAccounts.totals())
      qc.invalidateQueries(keysCategory.totals())
      qc.invalidateQueries(keysAccounts.balance())
    },
  })
}

export const useTransactionTotalsPerRange = (month: Ref<string | undefined>) => useQuery(
  keysTransactions.total(month),
  () => {
    const url = isDefined(month)
      ? `/api/transactions/totals?month=${get(month)}`
      : '/api/transactions/totals'

    return $fetch<TransactionsTotalsPerRange>(url)
  },
)

export const useTransactionTotalMonthly = () => useQuery(
  keysTransactions.totals(),
  () => $fetch<TransactionTotalMonthlyObject>('/api/transactions/totals/monthly'),
)

