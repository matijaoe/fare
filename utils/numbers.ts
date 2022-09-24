import { locale } from '.'

export const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    ...options,
  }).format(amount)
}

export const sum = (...args: number[]): number => args.reduce((a, b) => a + b, 0)
