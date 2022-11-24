import type { CashAccount, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import type { CashAccountWithAccount, CashAccountWithAccountAndTransactionsWithCategoryAndCashAccount, CashAccountWithTotals, CashAccountsBalanceModel, IndividualCashAccountTotals } from '~~/models/resources/account'

export const keysAccounts = {
  all: ['cash-accounts'] as const,
  // total balance
  balance: () => [...keysAccounts.all, 'balance'] as const,
  // account totals for range
  totals: () => [...keysAccounts.all, 'totals'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysAccounts.all, 'totals', from, to] as const,
  totalsIndividualRange: (id: string, from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysAccounts.all, 'totals', id, from, to] as const,
  // account details
  details: () => [...keysAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysAccounts.all, 'detail', unref(id)] as const,
  // account with transactions
  detailsWithRange: () => [...keysCategory.all, 'detail', 'transactions'] as const,
  detailWithRange: (id: string, from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysAccounts.all, 'detail', 'transactions', id, from, to] as const,
}

export const useCashAccount = (id: string) => useQuery(keysAccounts.detail(id),
  () => $fetch<CashAccountWithAccount>(`/api/accounts/cash/${unref(id)}`),
)

export const useCashAccountWithTransactions = (id: string, from: Ref<string | undefined>, to: Ref<string | undefined>) => useQuery(
  keysCategory.detailWithRange(id, from, to),
  () => {
    const fullRangeDefined = isDefined(from) && isDefined(to)
    const url = fullRangeDefined
      ? `/api/accounts/cash/${id}?transactions=true&from=${get(from)}&to=${get(to)}`
      : `/api/accounts/cash/${id}?transactions=true`

    return $fetch<CashAccountWithAccountAndTransactionsWithCategoryAndCashAccount>(url)
  },
)

export const useCashAccounts = (payload?: { transactions?: boolean }) => {
  const transactions = payload?.transactions?.toString() ?? 'false'
  return useQuery(
    keysAccounts.totals(),
    () => $fetch<CashAccountWithAccount[]>(`/api/accounts/cash?transactions=${transactions ?? 'false'}`),
  )
}

export const useCashAccountsTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) => {
  return useQuery(
    keysAccounts.totalsRange(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/accounts/totals?from=${get(from)}&to=${get(to)}`
        : '/api/accounts/totals'

      return $fetch<CashAccountWithTotals[]>(url)
    },
  )
}

export const useCashAccountTotals = (id: string, from: Ref<string | undefined>, to: Ref<string | undefined>) => {
  return useQuery(
    keysAccounts.totalsRange(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/accounts/totals/${id}?from=${get(from)}&to=${get(to)}`
        : `/api/accounts/totals/${id}`

      return $fetch<IndividualCashAccountTotals>(url)
    },
  )
}

export const useCashAccountsBalance = () => useQuery(
  keysAccounts.balance(),
  () => $fetch<CashAccountsBalanceModel>('/api/accounts/cash/balance'),
)

export const useCashAccountCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.MoneyAccountUncheckedCreateInput) => $fetch<CashAccount>('/api/accounts/cash', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}

export const useAccountUpdate = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.MoneyAccountUncheckedUpdateManyInput) =>
    $fetch<{ count: number }>(`/api/accounts/${get(id)}`, {
      method: 'PATCH',
      body,
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}

export const useAccountDelete = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation(({ userId }: { userId: string }) =>
    $fetch<{ count: number }>(`/api/accounts/${get(id)}`, {
      method: 'DELETE',
      body: { userId },
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}

