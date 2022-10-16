import type { Account, CashAccount, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import type { Ref } from 'vue'
import type { CashAccountWithAccount, CashAccountWithTotals, CashAccountsBalanceModel } from '~~/models/resources/account'

export const keysAccounts = {
  all: ['cash-accounts'] as const,
  balance: () => [...keysAccounts.all, 'balance'] as const,
  totals: () => [...keysAccounts.all, 'totals'] as const,
  totalsRanges: () => [...keysAccounts.all, 'totals', 'range'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keysAccounts.all, 'totals', 'range', from, to] as const,
  details: () => [...keysAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysAccounts.all, 'detail', unref(id)] as const,
}

export const useCached = async () => {
  await useFetch('/api/accounts/cash/balance', { key: 'balance' })
}

export const useCashAccount = (id: MaybeRef<string>) => useQuery(keysAccounts.detail(id), () => $fetch<CashAccountWithAccount>(`/api/accounts/cash/${unref(id)}`))

export const useCashAccounts = ({ transactions }: { transactions: 'true' | 'false' }) =>
  useQuery(
    keysAccounts.totals(),
    () => $fetch<CashAccountWithAccount[]>(`/api/accounts/cash?transactions=${transactions}`),
    // { initialData: useFetchedPayload<CashAccountWithAccount[]>('cash-accounts') },
  )

export const useCashAccountsTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) =>
  useQuery(
    keysAccounts.totalsRange(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/accounts/totals?from=${from.value}&to=${to.value}`
        : '/api/accounts/totals'

      return $fetch<CashAccountWithTotals[]>(url)
    },
  )

export const useCashAccountsBalance = () => useQuery(
  keysAccounts.balance(),
  () => $fetch<CashAccountsBalanceModel>('/api/accounts/cash/balance'),
  { initialData: useFetchedPayload<CashAccountsBalanceModel>('balance') },
)

export const useCashAccountCreate = () => {
  const qc = useQueryClient()

  return useMutation((body: Prisma.AccountUncheckedUpdateWithoutUserInput) => $fetch<CashAccount>('/api/accounts/cash', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}

export const useAccountUpdate = () => {
  const qc = useQueryClient()

  return useMutation(({ id, body }: { id: string; body: Prisma.AccountUpdateWithoutUserInput }) =>
    $fetch<Account>(`/api/accounts/${id}`, {
      method: 'PATCH',
      body,
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}

export const useAccountDelete = () => {
  const qc = useQueryClient()

  return useMutation((id: string) =>
    $fetch<Account>(`/api/accounts/${id}`, {
      method: 'DELETE',
    }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
    },
  })
}
