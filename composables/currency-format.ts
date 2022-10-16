import type { MaybeRef } from '@vueuse/core'
import { locale } from '~~/utils'

export const useCurrencyFormat = (amount: MaybeRef<number>, options?: MaybeRef<Intl.NumberFormatOptions>) =>
  computed(() => new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    ...[unref(options)],
  })?.format(unref(amount)))
