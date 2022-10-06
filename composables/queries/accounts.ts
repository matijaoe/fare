import { useQuery } from '@tanstack/vue-query'
import type { Ref } from 'vue'
import type { CashAccountsReport } from '~~/models/resources/account'

const keys = {
  all: ['accounts'] as const,
  totals: () => [...keys.all, 'totals'] as const,
  totalsRanges: () => [...keys.all, 'totals', 'range'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keys.all, 'totals', 'range', from, to] as const,
  details: () => [...keys.all, 'detail'] as const,
  detail: (id: Ref<string>) => [...keys.all, 'detail', id] as const,
}

export const useAccountsTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) =>
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
