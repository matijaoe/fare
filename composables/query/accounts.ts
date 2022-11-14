import type { CashAccount, MoneyAccount, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import { $fetch } from 'ohmyfetch'
import type { Ref } from 'vue'
import type { CashAccountWithAccount, CashAccountWithTotals, CashAccountsBalanceModel } from '~~/models/resources/account'

export const keysAccounts = {
  all: ['cash-accounts'] as const,
  balance: () => [...keysAccounts.all, 'balance'] as const,
  totals: () => [...keysAccounts.all, 'totals'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysAccounts.all, 'totals', from, to] as const,
  details: () => [...keysAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysAccounts.all, 'detail', unref(id)] as const,
}

export const useCashAccount = (id: string) => useQuery(keysAccounts.detail(id),
  () => $fetch<CashAccountWithAccount>(`/api/accounts/cash/${unref(id)}`),
  { initialData: () => useCachedPayload<CashAccountWithAccount>(`cash-account-${id}`) },
)

export const useCashAccounts = (payload?: { transactions?: boolean }) => {
  const transactions = payload?.transactions?.toString() ?? 'false'
  return useQuery(
    keysAccounts.totals(),
    () => $fetch<CashAccountWithAccount[]>(`/api/accounts/cash?transactions=${transactions ?? 'false'}`),
    { initialData: transactions !== 'true' ? useCachedPayload<CashAccountWithAccount[]>('cash-accounts') : null },
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
    { initialData: () => useCachedPayload<CashAccountWithTotals[]>(`cash-accounts-totals-${get(from)}-${get(to)}`) },
  )
}

export const useCashAccountsBalance = () => useQuery(
  keysAccounts.balance(),
  () => $fetch<CashAccountsBalanceModel>('/api/accounts/cash/balance'),
  { initialData: useCachedPayload<CashAccountsBalanceModel>('balance') },
)

export const useCashAccountCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.MoneyAccountUncheckedCreateWithoutUserInput) => $fetch<CashAccount>('/api/accounts/cash', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}

export const useAccountUpdate = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.MoneyAccountUpdateWithoutUserInput) =>
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
  return useMutation(() =>
    $fetch<MoneyAccount>(`/api/accounts/${get(id)}`, {
      method: 'DELETE',
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}
