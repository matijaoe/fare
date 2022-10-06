import type { Account } from '@prisma/client'
import type { Ref } from 'vue'
import { useQuery } from '@tanstack/vue-query'

const keys = {
  all: ['accounts'] as const,
  totals: () => [...keys.all, 'totals'] as const,
  totalsRanges: () => [...keys.all, 'totals', 'range'] as const,
  totalsRange: (from: Ref<string | undefined>, to: Ref<string | undefined>) => [...keys.all, 'totals', 'range', from, to] as const,
  details: () => [...keys.all, 'detail'] as const,
  detail: (id: Ref<string>) => [...keys.all, 'detail', id] as const,
}

export const useAccountsTotals = (from: Ref<string | undefined>, to: Ref<string | undefined>) =>
  useQuery<Account[]>(
    keys.totalsRange(from, to),
    () => {
      const fullRangeDefined = isDefined(from) && isDefined(to)
      const url = fullRangeDefined
        ? `/api/accounts/totals?from=${from.value}&to=${to.value}`
        : '/api/accounts/totals'

      return $fetch<Account[]>(url)
    },
  )
