<script lang="ts" setup>
const {
  isLoading: isNetWorthLoading,
  formattedNetWorth,
  formattedCashBalance,
  formattedInvestmentsBalance,
  netWorth,
} = useNetWorth()
const {
  isLoading: isNetWorthLoadingMonthly,
  formattedNetWorth: formattedNetWorthMonthly,
  formattedCashBalance: formattedCashBalanceMonthly,
  formattedInvestmentsBalance: formattedInvestmentsBalanceMonthly,
  netWorth: netWorthMonthly,
} = useNetWorthMonthly()

const { isAllTime, isCurrentMonth } = toRefs(useDateRangeStore())

// TODO: ideas
// percentage of growth?
// table of predicted net worth?
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
    </div>

    <LayoutSectionWrapper v-if="isAllTime ? netWorth : netWorthMonthly" title="Pie chart">
      <ChartNetWorthPie />
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
