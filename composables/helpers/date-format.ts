import type { MaybeRef } from '@vueuse/core'

export const useDateFormat = (date: MaybeRef<Date | string>, options: MaybeRef<Intl.DateTimeFormatOptions> = {}) => formatDate(unref(date), unref(options))
