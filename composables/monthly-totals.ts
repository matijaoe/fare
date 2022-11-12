import type { TransactionType } from '@prisma/client'
import { format, isThisYear } from 'date-fns'
import type { Ref } from 'nuxt/dist/app/compat/capi'
import type { TransactionTotalMonthlyObject } from '~~/models/resources/transaction'

export const useMonthlyTotals = (totals: Ref<TransactionTotalMonthlyObject> | Ref<undefined>, type: TransactionType) => {
  const monthsRange = ref(6)

  const months = $computed(() => Array.from({ length: monthsRange.value }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    return date
  }).reverse())

  const formatted = $computed(() => months.map(date => ({
    label: isThisYear(date) ? format(date, 'MMM') : format(date, 'MMM yy'),
    date: format(date, 'yyyy-MM'),
  })))

  const expensesTotals = computed(() => {
    const arr = totals.value?.[type] ?? []

    const findMo = (date: string) => arr.find(t => t.date === date)
    return formatted.map((date) => {
      const calculated = findMo(date.date) ?? { type, currency: 'EUR', total: 0 }
      return {
        ...date,
        ...calculated,
      }
    }) ?? []
  })

  const labels = computed(() => expensesTotals.value.map(t => t.label))
  const data = computed(() => expensesTotals.value.map(t => t.total))

  return {
    months,
    expensesTotals,
    labels,
    data,
  }
}
