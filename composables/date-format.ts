import type { MaybeRef } from '@vueuse/core'
import { locale } from '~~/utils'

export const useDateFormat = (date: MaybeRef<Date | string>, options?: MaybeRef<Intl.DateTimeFormatOptions>) =>
  Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    ...[isRef(options) ? options.value : options],
  }).format(new Date(isRef(date) ? date.value : date))
