<script lang="ts" setup>
const props = withDefaults(defineProps<{
  height?: number
  responsive?: boolean
  hasLegend?: boolean
  totalData?: boolean
}>(), {
  height: 400,
  responsive: false,
  hasLegend: true,
})

const { cashBalance, investmentsBalance } = useNetWorth()
const { cashBalance: cashBalanceMonthly, investmentsBalance: investmentsBalanceMonthly } = useNetWorthMonthly()

const { isAllTime, isCurrentMonth } = toRefs(useDateRangeStore())

const chartData = computed(() => ({
  labels: ['Cash', 'Investments'],
  datasets: [
    {
      backgroundColor: ['#34d399', '#38BDF8'],
      borderColor: ['#16a34a', '#0284c7'],
      data: [cashBalance.value, investmentsBalance.value],
    },
  ],
}))
const chartDataMonthly = computed(() => ({
  labels: ['Cash', 'Investments'],
  datasets: [
    {
      backgroundColor: ['#34d399', '#38BDF8'],
      borderColor: ['#16a34a', '#0284c7'],
      data: [cashBalanceMonthly.value, investmentsBalanceMonthly.value],
    },
  ],
}))

const chartOptions = computed(() => ({
  responsive: props.responsive,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      mode: 'index',
      position: 'nearest',
      callbacks: {
        label: (ctx: any) => formatCurrency(ctx.parsed),
      },
    },
    legend: props.hasLegend ? { position: 'bottom' } : false,
  },
}))

const showTotal = computed(() => props.totalData || isCurrentMonth.value || isAllTime.value)
</script>

<template>
  <pie-chart
    :height="height"
    :data="showTotal ? chartData : chartDataMonthly"
    :options="chartOptions"
  />
</template>
