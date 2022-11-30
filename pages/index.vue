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

const chartData = computed(() => ({
  labels: ['Cash', 'Investments'],
  datasets: [
    {
      backgroundColor: ['#34d399', '#38bdf8'],
      data: [cashBalance.value, investmentsBalance.value],
    },
  ],
}))

const chartOptions = {
  responsive: true,
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
</script>

<template>
  <LayoutPage>
    <div grid grid-cols-4 gap-4>
      <FCard white w-full col-span-2>
        <div flex="~ col gap-1">
          <p text="sm zinc-4" font="sans medium" uppercase>
            Net worth
          </p>
          <div flex gap-2 items-center>
            <FSkeleton
              v-if="isNetWorthLoading"
              class="h-60px w-220px"
            />
            <p v-else-if="formattedNetWorth" text-6xl font-display font-medium>
              {{ formattedNetWorth }}
            </p>
          </div>
        </div>

        <div mt-2>
          <div flex items-end gap-2 font-mono>
            <FSkeleton
              v-if="isNetWorthLoading"
              class="h-16px w-72px"
              m="t-1 b-1"
            />
            <p v-else font-medium>
              {{ formattedCashBalance }}
            </p>
            <p text="zinc-4 sm" mb="0.25">
              in cash
            </p>
          </div>

          <div flex items-end gap-2 font-mono>
            <FSkeleton
              v-if="isNetWorthLoading"
              class="h-16px w-80px"
              m="t-1 b-1"
            />
            <p v-else font-medium>
              {{ formattedInvestmentsBalance }}
            </p>
            <p text="zinc-4 sm" mb="0.25">
              in investments
            </p>
          </div>
        </div>
      </FCard>

      <FCard white col-span-2 row-span-2 grid place-content-center>
        <pie-chart
          :chart-data="chartData"
          :chart-options="chartOptions"
        />
      </FCard>
    </div>
  </LayoutPage>
</template>
