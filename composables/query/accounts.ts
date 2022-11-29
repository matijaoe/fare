import type { CashAccount, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'
import { get } from '@vueuse/core'
import type { Ref } from 'vue'
import { keysTransactions } from './transactions'
import type { CashAccountWithAccount, CashAccountWithAccountAndTransactionsWithCategoryAndCashAccount, CashAccountWithTotals, CashAccountsBalanceModel, IndividualCashAccountTotals, TransactionWithCategoryAndCashAccount } from '~~/models/resources'

export const keysAccounts = {
  all: ['cash-accounts'] as const,
  // total balance
  balance: () => [...keysAccounts.all, 'balance'] as const,
  balanceRange: (month: Ref<string | undefined>) => [...keysAccounts.all, 'balance', month] as const,
  // account totals for range
  totals: () => [...keysAccounts.all, 'totals'] as const,
  totalsBalance: () => [...keysAccounts.all, 'totals', 'balance'] as const,
  totalsRange: (month: Ref<string | undefined>) => [...keysAccounts.all, 'totals', month] as const,
  totalsIndividualRange: (id: string, month: Ref<string | undefined>) => [...keysAccounts.all, 'totals', id, month] as const,
  // account details
  details: () => [...keysAccounts.all, 'detail'] as const,
  detail: (id: MaybeRef<string>) => [...keysAccounts.all, 'detail', unref(id)] as const,
  // account with transactions
  detailsWithRange: () => [...keysAccounts.all, 'detail', 'transactions'] as const,
  detailWithRange: (id: string, month: Ref<string | undefined>) => [...keysAccounts.all, 'detail', 'transactions', id, month] as const,
}

export const useCashAccounts = (payload?: { transactions?: boolean }) => {
  const transactions = payload?.transactions?.toString() ?? 'false'
  return useQuery(
    keysAccounts.details(),
    () => $fetch<CashAccountWithAccount[]>(`/api/accounts/cash?transactions=${transactions ?? 'false'}`),
  )
}

export const useCashAccount = (id: string) => {
  const qc = useQueryClient()
  return useQuery(keysAccounts.detail(id),
    () => $fetch<CashAccountWithAccount>(`/api/accounts/cash/${unref(id)}`),
    {
      initialData: () => {
        return qc.getQueryData<CashAccountWithAccount[]>(keysAccounts.details())?.find(acc => acc.id === id)
      },
    },
  )
}

export const useCashAccountWithTransactions = (id: string, month: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useQuery(
    keysAccounts.detailWithRange(id, month),
    () => {
      const url = isDefined(month)
        ? `/api/accounts/cash/${id}?transactions=true&month=${get(month)}`
        : `/api/accounts/cash/${id}?transactions=true`

      return $fetch<CashAccountWithAccountAndTransactionsWithCategoryAndCashAccount>(url)
    },
    {
      initialData: () => {
        const cashAccountWithAccount = qc.getQueryData<CashAccountWithAccount[]>(keysAccounts.details())?.find(acc => acc.id === id) ?? {}
        const transactions = qc.getQueryData<TransactionWithCategoryAndCashAccount[]>(keysTransactions.range(month))?.filter(t => t.fromAccountId === id || t.toAccountId === id)

        if (!transactions) {
          return undefined
        }

        const paymentFromAccount = transactions.filter(t => t.fromAccountId === id)
        const paymentToAccount = transactions.filter(t => t.toAccountId === id)

        return {
          ...cashAccountWithAccount,
          paymentFromAccount,
          paymentToAccount,
        }
      },
    },
  )
}

// TODO: separate endpoint for accounts with only current balance
export const useCashAccountsTotals = (month: Ref<string | undefined>) => {
  return useQuery(
    keysAccounts.totalsRange(month),
    () => {
      const url = isDefined(month)
        ? `/api/accounts/totals?month=${get(month)}`
        : '/api/accounts/totals'

      return $fetch<CashAccountWithTotals[]>(url)
    },
  )
}

// TODO: separate endpoint for accounts with only current balance
export const useCashAccountsTotalBalancePer = () => {
  return useQuery(
    keysAccounts.totalsBalance(),
    () => {
      return $fetch<{ id: string; balance: number }[]>('/api/accounts/totals/balance')
    },
  )
}

export const useCashAccountTotals = (id: string, month: Ref<string | undefined>) => {
  const qc = useQueryClient()
  return useQuery(
    keysAccounts.totalsIndividualRange(id, month),
    () => {
      const url = isDefined(month)
        ? `/api/accounts/totals/${id}?month=${get(month)}`
        : `/api/accounts/totals/${id}`

      return $fetch<IndividualCashAccountTotals>(url)
    },
    {
      initialData: () => {
        return qc.getQueryData<CashAccountWithTotals[]>(keysAccounts.totalsRange(month))?.find(acc => acc.id === id)
      },
    },
  )
}

export const useCashAccountsBalance = () => {
  return useQuery(
    keysAccounts.balance(),
    () => $fetch<CashAccountsBalanceModel>('/api/accounts/cash/balance'),
  )
}

export const useCashAccountsMonthlyBalance = (month: Ref<string | undefined>) => {
  return useQuery(
    keysAccounts.balanceRange(month),
    () => $fetch<CashAccountsBalanceModel>(`/api/accounts/cash/balance?month=${get(month)}`),
  )
}

export const useCashAccountCreate = () => {
  const qc = useQueryClient()
  return useMutation((body: Prisma.MoneyAccountUncheckedCreateInput) => $fetch<CashAccount>('/api/accounts/cash', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keysAccounts.all)
      qc.invalidateQueries(keysInvestmentAccounts.details())
      qc.invalidateQueries(keysInvestmentAccounts.balance())
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
      qc.invalidateQueries(keysInvestmentAccounts.balance())
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
      qc.invalidateQueries(keysInvestmentAccounts.balance())
    },
  })
}

