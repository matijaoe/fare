<script setup lang="ts">
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
      label: 'Expenses',
      data: expensesData,
      borderColor: '#FF9494',
      backgroundColor: '#FF9494',
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
      borderColor: '#B6E388',
      backgroundColor: '#B6E388',
      segment: {
        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      tension,
    },
  ],
}))

const chartOptions = { responsive: true, mantainAspectRatio: false }
</script>

<template>
  <div
    flex
    lg:flex-row
    w-full
  >
    <bar-chart
      flex-1
      w-full
      :height="200"
      :chart-options="chartOptions"
      :chart-data="chartData"
    />
    <!-- <line-chart
      flex-1
      max-w="350px"
      :chart-data="chartData"
      :chart-options="chartOptions"
    /> -->
  </div>
</template>

