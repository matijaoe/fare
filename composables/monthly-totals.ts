import type { TransactionType } from '@prisma/client'
import { format, isThisYear } from 'date-fns'
import type { Ref } from 'nuxt/dist/app/compat/capi'
import type { TransactionTotalMonthlyObject } from '~~/models/resources/transaction'

export const useMonthlyTotals = (totals: Ref<TransactionTotalMonthlyObject | undefined>, monthCount: Ref<number>) => {
  const months = $computed(() => Array.from({ length: monthCount.value }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    return date
  }).reverse())

  const graphLabeledDates = $computed(() => months.map(date => ({
    label: isThisYear(date) ? format(date, 'MMM') : format(date, 'MMM yy'),
    date: format(date, 'yyyy-MM'),
  })))

  const calcTransactionsTotals = (type: TransactionType) => {
    const arr = totals.value?.[type] ?? []

    const getTransactionsForMonth = (date: string) => arr.filter(t => t.date === date)

    return graphLabeledDates.map(({ label, date }) => {
      const transactionsForMonth = getTransactionsForMonth(date)
      const total = transactionsForMonth.reduce((acc, curr) => acc + curr.total, 0)

      const { type, currency } = transactionsForMonth[0] ?? {}
      return {
        label,
        date,
        total,
        type,
        currency,
      }
    }) ?? []
  }

  const expenseTotals = computed(() => calcTransactionsTotals('Expense').map(({ total }) => total))
  const incomeTotals = computed(() => calcTransactionsTotals('Income').map(({ total }) => total))

  // calculate net totals
  const netTotals = computed(() => {
    const arr = Array.from({ length: monthCount.value }, (_, i) => i)
    return arr.map(i => incomeTotals.value[i] - expenseTotals.value[i])
  })

  return {
    months,
    labels: computed(() => graphLabeledDates.map(t => t.label)),
    expenseTotals,
    incomeTotals,
    netTotals,
  }
}
