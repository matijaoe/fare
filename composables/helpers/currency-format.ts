import type { MaybeComputedRef } from '@vueuse/core'
import { resolveUnref } from '@vueuse/core'
import { formatCurrency } from '~~/utils'

export const useCurrencyFormat = (amount: MaybeComputedRef<number>, options?: MaybeComputedRef<Intl.NumberFormatOptions>) =>
  computed(() => formatCurrency(resolveUnref(amount), resolveUnref(options)))
