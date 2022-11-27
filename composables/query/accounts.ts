import type { CashAccount, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import type { CashAccountWithAccount, CashAccountWithAccountAndTransactionsWithCategoryAndCashAccount, CashAccountWithTotals, CashAccountsBalanceModel, IndividualCashAccountTotals } from '~~/models/resources'

export const keysAccounts = {
  all: ['cash-accounts'] as const,
  // total balance
  balance: () => [...keysAccounts.all, 'balance'] as const,
  // account totals for range
  totals: () => [...keysAccounts.all, 'totals'] as const,
  totalsRange: (month: Ref<string | undefined>) => [...keysAccounts.all, 'totals', month] as const,
  totalsIndividualRange: (id: string, month: Ref<string | undefined>) => [...keysAccounts.all, 'totals', id, month] as const,
  // account details
  details: () => [...keysAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysAccounts.all, 'detail', unref(id)] as const,
  // account with transactions
  detailsWithRange: () => [...keysAccounts.all, 'detail', 'transactions'] as const,
  detailWithRange: (id: string, month: Ref<string | undefined>) => [...keysAccounts.all, 'detail', 'transactions', id, month] as const,
}

export const useCashAccount = (id: string) => useQuery(keysAccounts.detail(id),
  () => $fetch<CashAccountWithAccount>(`/api/accounts/cash/${unref(id)}`),
)

export const useCashAccountWithTransactions = (id: string, month: Ref<string | undefined>) => useQuery(
  keysAccounts.detailWithRange(id, month),
  () => {
    const url = isDefined(month)
      ? `/api/accounts/cash/${id}?transactions=true&month=${get(month)}`
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

export const useCashAccountsTotals = (month: Ref<string | undefined>) => useQuery(
  keysAccounts.totalsRange(month),
  () => {
    const url = isDefined(month)
      ? `/api/accounts/totals?month=${get(month)}`
      : '/api/accounts/totals'

    return $fetch<CashAccountWithTotals[]>(url)
  },
)

export const useCashAccountTotals = (id: string, month: Ref<string | undefined>) => useQuery(
  keysAccounts.totalsIndividualRange(id, month),
  () => {
    const url = isDefined(month)
      ? `/api/accounts/totals/${id}?month=${get(month)}`
      : `/api/accounts/totals/${id}`

    return $fetch<IndividualCashAccountTotals>(url)
  },
)

export const useCashAccountsBalance = () => useQuery(
  keysAccounts.balance(),
  () => $fetch<CashAccountsBalanceModel>('/api/accounts/cash/balance'),
)

export const useCashAccountCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.MoneyAccountUncheckedCreateInput) => $fetch<CashAccount>('/api/accounts/cash', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
      qc.invalidateQueries(keysInvestmentAccounts.details())
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
      qc.invalidateQueries(keysInvestmentAccounts.details())
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
      qc.invalidateQueries(keysInvestmentAccounts.details())
    },
  })
}

