import { resolveUnref } from '@vueuse/core'
import type { MaybeComputedRef } from '@vueuse/core'
import { locale } from '~~/utils'

export const useCurrencyFormat = (amount: MaybeComputedRef<number>, options?: MaybeComputedRef<Intl.NumberFormatOptions>) =>
  computed(() => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    ...[unref(options)],
  })?.format(resolveUnref(amount)))
