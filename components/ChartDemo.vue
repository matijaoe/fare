<script setup lang="ts">
const tension = 0.5

const skipped = (ctx: any, value: any) => ctx.p0.skip || ctx.p1.skip ? value : undefined
const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined

const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Expense',
      data: [65, 59, NaN, 48, 56, 57, 40],
      borderColor: 'rgb(75, 192, 192)',
      segment: {
        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      tension,
    },
  ],
}

const chartOptions = { responsive: true }
</script>

<template>
  <ClientOnly>
    <div
      flex
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
  </ClientOnly>
</template>

