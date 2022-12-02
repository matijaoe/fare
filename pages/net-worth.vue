<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Dashboard', href: { name: 'index' } },
]))

const {
  isLoading: isNetWorthLoading,
  formattedNetWorth,
  formattedCashBalance,
  formattedInvestmentsBalance,
  netWorth,
  cashBalance,
  investmentsBalance,
} = useNetWorth()
const {
  isLoading: isNetWorthLoadingMonthly,
  formattedNetWorth: formattedNetWorthMonthly,
  formattedCashBalance: formattedCashBalanceMonthly,
  formattedInvestmentsBalance: formattedInvestmentsBalanceMonthly,
  netWorth: netWorthMonthly,
  cashBalance: cashBalanceMonthly,
  investmentsBalance: investmentsBalanceMonthly,
} = useNetWorthMonthly()

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

const chartOptions = {
  responsive: false,
  maintainAspectRatio: true,
  plugins: {
    tooltip: {
      mode: 'index',
      position: 'nearest',
      callbacks: {
        label: (ctx: any) => {
          console.log('ctx :>> ', ctx)
          return formatCurrency(ctx.parsed)
        },
      },
    },
    legend: { position: 'bottom' },
  },
}

const showMonthly = computed(() => !isCurrentMonth.value && !isAllTime.value)
</script>

<template>
  <LayoutPage>
    <div flex flex-col lg:flex-row items-start gap-8 justify-between>
      <BalanceShownWrapper>
        <template #current>
          <BalanceNetWorth
            label="Total net worth"
            :loading="isNetWorthLoading"
            :net-worth="formattedNetWorth"
            :cash="formattedCashBalance"
            :investments="formattedInvestmentsBalance"
          />
        </template>

        <template #old>
          <BalanceNetWorth
            label="At the time"
            :loading="isNetWorthLoadingMonthly"
            :net-worth="formattedNetWorthMonthly"
            :cash="formattedCashBalanceMonthly"
            :investments="formattedInvestmentsBalanceMonthly"
            dimmed
          />
        </template>
      </BalanceShownWrapper>

      <div flex-1 flex flex-col items-end justify-center>
        <pie-chart
          :height="400"
          :chart-data="showMonthly ? chartDataMonthly : chartData"
          :chart-options="chartOptions"
        />
      </div>
    </div>
  </LayoutPage>
</template>
