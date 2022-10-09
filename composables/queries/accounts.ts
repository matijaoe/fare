import type { CashAccount, Prisma } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import type { CashAccountWithAccount, CashAccountsReport } from '~~/models/resources/account'

const keys = {
  all: ['cash-accounts'] as const,
  totals: () => [...keys.all, 'totals'] as const,
  totalsRanges: () => [...keys.all, 'totals', 'range'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keys.all, 'totals', 'range', from, to] as const,
  details: () => [...keys.all, 'detail'] as const,
  detail: (id: Ref<string>) => [...keys.all, 'detail', id] as const,
}

export const useCashAccounts = ({ transactions }: { transactions: 'true' | 'false' }) => useQuery<CashAccountWithAccount[]>(keys.totals(), () => $fetch<CashAccountWithAccount[]>(`/api/accounts/cash?transactions=${transactions}`))

export const useCashAccountsTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) =>
  useQuery<CashAccountsReport>(
    keys.totalsRange(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/accounts/totals?from=${from.value}&to=${to.value}`
        : '/api/accounts/totals'

      return $fetch<CashAccountsReport>(url)
    },
  )

export const useCashAccountCreate = () => {
  const qc = useQueryClient()

  return useMutation((body: Prisma.AccountUncheckedUpdateWithoutUserInput) => $fetch<CashAccount>('/api/accounts/cash', { method: 'POST', body }), {
    onSuccess: () => {
      qc.invalidateQueries(keys.all)
    },
  })
}
