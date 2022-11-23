import type { InvestmentAccount, InvestmentEntry, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@tanstack/vue-query/build/lib/types'
import type { InvestmentAccountWithAccount, InvestmentAccountWithEntries } from '~~/models/resources/investment-account'

export const keysInvestmentAccounts = {
  all: ['investment-accounts'] as const,
  basic: () => [...keysInvestmentAccounts.all, 'basic'] as const,
  entries: () => [...keysInvestmentAccounts.all, 'entries'] as const,
  details: () => [...keysInvestmentAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysInvestmentAccounts.all, 'detail', unref(id)] as const,
}

export const useInvestmentAccount = (id: string) => useQuery(keysInvestmentAccounts.detail(id),
  () => $fetch<InvestmentAccountWithAccount>(`/api/accounts/investment/${unref(id)}`),
)

export const useInvestmentAccounts = () => useQuery(
  keysInvestmentAccounts.basic(),
  () => $fetch<InvestmentAccountWithAccount[]>('/api/accounts/investment'),
)

export const useInvestmentAccountCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.InvestmentAccountUncheckedCreateInput) => $fetch<InvestmentAccount>('/api/accounts/investment', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysInvestmentAccounts.all)
    },
  })
}

export const useInvestmentAccountsEntries = () => useQuery(
  keysInvestmentAccounts.entries(),
  () => $fetch<InvestmentAccountWithEntries[]>('/api/accounts/investment/entries'),
)

export const useInvestmentAccountsEntryCreate = () => {
  const qc = useQueryClient()
  useMutation(
    (body: Prisma.InvestmentEntryUncheckedCreateInput) => $fetch<InvestmentEntry>('/api/accounts/investment/entries', { method: 'POST', body }),
    {
      onSuccess: () => {
        qc.invalidateQueries(keysInvestmentAccounts.entries())
      },
    },
  )
}

// TODO: get balance of all investment accounts
