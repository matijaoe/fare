import { locale } from '.'

export const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'EUR',
    ...options,
  }).format(amount)
}
