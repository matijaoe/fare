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

  const graphLabeledDates = $computed(() => months.map(date => ({
    label: isThisYear(date) ? format(date, 'MMM') : format(date, 'MMM yy'),
    date: format(date, 'yyyy-MM'),
  })))

  const transactionsTotals = computed(() => {
    const arr = totals.value?.[type] ?? []

    const getTransactionsForMonth = (date: string) => arr.filter(t => t.date === date)

    return graphLabeledDates.map((date) => {
      const transactionsForMonth = getTransactionsForMonth(date.date) ?? { type, currency: 'EUR', total: 0 }
      const total = transactionsForMonth.reduce((acc, curr) => acc + curr.total, 0)

      return {
        ...date,
        total,
        type,
        currency: transactionsForMonth[0]?.currency ?? 'EUR',

      }
    }) ?? []
  })

  const labels = computed(() => transactionsTotals.value.map(t => t.label))
  const data = computed(() => transactionsTotals.value.map(t => t.total))

  return {
    months,
    transactionsTotals,
    labels,
    data,
  }
}
