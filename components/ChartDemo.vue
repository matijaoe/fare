<script setup lang="ts">
import { format, isThisYear } from 'date-fns'

const tension = 0.5

const skipped = (ctx: any, value: any) => ctx.p0.skip || ctx.p1.skip ? value : undefined
const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined

// Dates
const { data: totals } = useTransactionTotalMonthlys()

const { labels, data: expensesData } = $(useMonthlyTotals(totals, 'Expense'))
const { data: incomeData } = $(useMonthlyTotals(totals, 'Income'))

const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: 'Expense',
      data: expensesData,
      borderColor: '#0D9488',
      segment: {
        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      tension,
    },
    {
      label: 'Income',
      data: incomeData,
      borderColor: '#EA580C',
      segment: {
        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      tension,
    },
  ],
}))

const chartOptions = { responsive: true }
</script>

<template>
  <div
    flex
    flex-col
    lg:flex-row
    w-full
  >
    <bar-chart
      :chart-options="chartOptions"
      :chart-data="chartData"
    />
    <line-chart
      :chart-data="chartData"
      :chart-options="chartOptions"
    />
  </div>
</template>

