import type { InvestmentAccount, InvestmentEntry, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import type { InvestmentAccoundUpdateReq, InvestmentAccountWithAccount, InvestmentAccountWithEntries, InvestmentsBalance } from '~~/models/resources'

export const keysInvestmentAccounts = {
  all: ['investment-accounts'] as const,
  // balance (current/total balance and balance up until date)
  balance: () => [...keysInvestmentAccounts.all, 'balance'] as const,
  balanceRange: (month: Ref<string | undefined>) => [...keysInvestmentAccounts.all, 'balance', month] as const,
  // account balance
  entries: () => [...keysInvestmentAccounts.all, 'entries'] as const,
  // individual account details
  details: () => [...keysInvestmentAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysInvestmentAccounts.all, 'detail', unref(id)] as const,
}

export const useInvestmentAccount = (id: string) => useQuery(keysInvestmentAccounts.detail(id),
  () => $fetch<InvestmentAccountWithAccount>(`/api/accounts/investment/${unref(id)}`),
)

export const useInvestmentAccounts = () => useQuery(
  keysInvestmentAccounts.details(),
  () => $fetch<InvestmentAccountWithAccount[]>('/api/accounts/investment'),
)

export const useInvestmentAccountCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: { account: Prisma.MoneyAccountUncheckedCreateInput } & Prisma.InvestmentAccountCreateInput) => $fetch<InvestmentAccount>('/api/accounts/investment', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysInvestmentAccounts.all)
    },
  })
}

export const useInvestmentAccountUpdate = (id: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation((body: InvestmentAccoundUpdateReq) => $fetch< Record<'investmentAccount' | 'account', { count: number }>> (`/api/accounts/investment/${get(id)}`, { method: 'PATCH', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysInvestmentAccounts.details())
    },
  })
}

export const useInvestmentsBalance = () => useQuery(
  keysInvestmentAccounts.balance(),
  () => $fetch<InvestmentsBalance>('/api/accounts/investment/balance'),
)

export const useInvestmentsMonthlyBalance = (month: Ref<string | undefined>) => useQuery(
  keysInvestmentAccounts.balanceRange(month),
  () => $fetch<InvestmentsBalance>(`/api/accounts/investment/balance?month=${get(month)}`),
)

export const useInvestmentAccountsEntries = () => useQuery(
  keysInvestmentAccounts.entries(),
  () => $fetch<InvestmentAccountWithEntries[]>('/api/accounts/investment/entries'),
)

export const useInvestmentAccountsEntryCreate = () => {
  const qc = useQueryClient()
  return useMutation(
    (body: Prisma.InvestmentEntryUncheckedCreateInput) => $fetch<InvestmentEntry>('/api/accounts/investment/entries', { method: 'POST', body }),
    {
      onSuccess: () => {
        qc.invalidateQueries(keysInvestmentAccounts.entries())
      },
    },
  )
}

// TODO: get balance of all investment accounts
