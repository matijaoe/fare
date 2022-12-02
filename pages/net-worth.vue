<script lang="ts" setup>
const {
  isLoading: isNetWorthLoading,
  formattedNetWorth,
  formattedCashBalance,
  formattedInvestmentsBalance,
} = useNetWorth()
const {
  isLoading: isNetWorthLoadingMonthly,
  formattedNetWorth: formattedNetWorthMonthly,
  formattedCashBalance: formattedCashBalanceMonthly,
  formattedInvestmentsBalance: formattedInvestmentsBalanceMonthly,
} = useNetWorthMonthly()
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
        <ChartNetWorthPie :height="400" />
      </div>
    </div>
  </LayoutPage>
</template>
