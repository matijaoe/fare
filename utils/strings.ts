import type { MaybeRef } from '@vueuse/core'

export const toTitleCase = (str: string) => str.replace(
  /\w\S*/g,
  txt => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase(),
)

export const formatDate = (date: Date | string, options?: MaybeRef<Intl.DateTimeFormatOptions>) => {
  return Intl.DateTimeFormat(locale, {
    dateStyle: 'medium',
    ...options,
  }).format(new Date(date))
}

export const handlePlural = (n: number, word: string) => {
  if (n === 1) {
    return word
  }
  return `${word}s`
}
