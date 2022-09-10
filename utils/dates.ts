import { locale } from '.'

export const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat(locale, { dateStyle: 'full', ...options }).format(new Date(date))
}

const formatter = new Intl.RelativeTimeFormat(undefined, {
  numeric: 'auto',
})

const DIVISIONS: {
  amount: number
  name: Intl.RelativeTimeFormatUnit
}[] = [
  { amount: 60, name: 'seconds' },
  { amount: 60, name: 'minutes' },
  { amount: 24, name: 'hours' },
  { amount: 7, name: 'days' },
  { amount: 4.34524, name: 'weeks' },
  { amount: 12, name: 'months' },
  { amount: Number.POSITIVE_INFINITY, name: 'years' },
]

export const formatTimeAgo = (date: string | Date) => {
  let duration = (new Date(date) - new Date()) / 1000

  for (let i = 0; i <= DIVISIONS.length; i++) {
    const division = DIVISIONS[i]
    if (Math.abs(duration) < division.amount) {
      return formatter.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}
