<script lang="ts" setup>
import type { ChartDataset } from 'chart.js'
import { addYears, format } from 'date-fns'

const yearCount = ref(10)
const yearCountInputValue = computed<string>({
  get: () => yearCount.value.toString(),
  set: (value: string) => {
    const parsed = parseInt(value)
    if (isNaN(parsed)) {
      yearCount.value = 1
    } else {
      yearCount.value = parsed
    }
    return 2
  },
})

const { compoundedNetWorthForNextYears: compoundedValues, netWorthGoal } = $(useFireCalculation(yearCount))
const fireConfig = useFireConfig()

const isYearsCalculated = computed(() => {
  return compoundedValues?.every(
    year => year.total !== null && !isNaN(year.total),
  )
})

const netWorthTotals = $computed(() => compoundedValues?.map(year => year.total ?? 0) ?? [])
const cashTotals = $computed(() => compoundedValues?.map(year => year.totalCash ?? 0) ?? [])
const nestEggTotals = $computed(() => compoundedValues?.map(year => year.compoundedNestEgg ?? 0) ?? [])
const interestEarnedTotals = $computed(() => compoundedValues?.map(year => year.earnedPureInterest ?? 0) ?? [])

const labels = $computed(() => {
  return compoundedValues?.map((v) => {
    const yrs = v.months / 12
    return format(addYears(new Date(), yrs), 'yyyy')
  }) ?? []
})

const datasets = $computed<Record<string, ChartDataset>>(() => ({
  total: {
    label: 'Net worth',
    data: netWorthTotals,
    backgroundColor: '#818cf8',
    borderColor: '#6366f1',
    borderWidth: 3,
  },
  cash: {
    label: 'Cash',
    data: cashTotals,
    backgroundColor: '#34D399',
    borderColor: '#059669',
    borderWidth: 3,
  },
  investments: {
    label: 'Nest egg',
    data: nestEggTotals,
    backgroundColor: '#fbbf24',
    borderColor: '#d97706',
    borderWidth: 3,
  },
}))
</script>

<template>
  <LayoutPage>
    <LayoutSectionWrapper
      v-if="isYearsCalculated"
      title="FI chart"
      flex flex-col gap-4
    >
      <ChartExpenseIncome
        :height="220"
        :labels="labels"
        :datasets="[datasets.total, datasets.cash, datasets.investments]"
      />
      <input v-model="yearCountInputValue" type="range" :step="1" :max="80" :min="3">

      <div>
        yearly cash savings {{ fireConfig.yearlyCashSavings }}
      </div>

      <div>
        netWorthGoal: {{ netWorthGoal }}
      </div>

      <div v-for="nw in compoundedValues" :key="nw.months" bg-blue-2>
        <div>
          {{ nw.months }} months ({{ nw.months / 12 }} years)
        </div>
        <div>
          NET WORTH: {{ nw.total }}
        </div>

        <div>
          nest egg: {{ nw.compoundedNestEgg }}
        </div>

        <div>
          cash: {{ nw.totalCash }}
        </div>

        <div>
          JUST INTEREST: {{ nw.earnedPureInterest }}
        </div>
      </div>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
