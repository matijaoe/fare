<script lang="ts" setup>
import { TabGroup } from '@headlessui/vue'
import type { ChartDataset } from 'chart.js'
import { addYears, format } from 'date-fns'
import { monthsToYearsAndMonthsString } from '../utils'

const yearCount = ref(0)
// add boolean for toggling for continuos contributions

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

const config = useFireConfigStore()
const { userId } = await useAuth()
const { mutate: updateUser, isLoading: isUpdateLoading } = useUserUpdate(userId)

const updateUserHandler = () => {
  updateUser(
    Object.keys(config.all).reduce((acc, key) => {
      acc[key] = config.all?.[key] ?? null
      return acc
    }, {} as Record<string, string>),
  )
}

const { compoundedNetWorthForNextYears: compoundedValues, netWorthGoal, timeToNetWorthGoal, fiDate } = $(useFireCalculation(yearCount))

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
    order: 3,
  },
  cash: {
    label: 'Cash',
    data: cashTotals,
    backgroundColor: '#34D399',
    borderColor: '#059669',
    order: 1,
  },
  investments: {
    label: 'Nest egg',
    data: nestEggTotals,
    backgroundColor: '#fbbf24',
    borderColor: '#d97706',
    order: 2,
  },
}))
</script>

<template>
  <LayoutPage>
    <LayoutSectionWrapper
      v-if="isYearsCalculated"
      flex flex-col gap-4
    >
      <div
        v-if="(timeToNetWorthGoal && fiDate)"
        flex flex-col items-center
      >
        You can achieve Financial Independence in
        <span font-bold text-4xl mt-2>{{ monthsToYearsAndMonthsString(timeToNetWorthGoal) }}</span>

        <span v-if="fiDate.age" font-semibold text-xl mt-1>by the age of {{ fiDate.age }}</span>
      </div>

      <div max-w="1000px" mx-auto>
        <ChartNetWorth
          :height="220"
          :labels="labels"
          :datasets="[datasets.total, datasets.cash, datasets.investments]"
        />
      </div>

      <div flex gap-8 pt-14>
        <div flex-1 flex flex-col gap-4 max-w-xl>
          <BalanceNetWorthFutureCard
            v-for="values in compoundedValues"
            :key="values.months"
            :data="values"
          />
        </div>

        <div flex-1>
          <div space-y-1>
            <BasicLabel>Net worth goal</BasicLabel>
            <div v-if="netWorthGoal != null" font-display text-5xl font-medium>
              {{ formatCurrency(netWorthGoal) }}
            </div>
            <p v-else text-lg text-zinc-3>
              Not set
            </p>
          </div>

          <input v-model="yearCountInputValue" py-4 w-full type="range" :step="1" :max="30" :min="3">

          <TabGroup>
            <TabList flex-1 flex gap-2 pb-3 border="b-2" border-base>
              <FTab>
                Financial
              </FTab>
              <FTab>
                General
              </FTab>
              <FButton
                v-if="config.hasChanged"
                ml-auto
                variant="success" size="sm"
                :loading="isUpdateLoading"
                @click="updateUserHandler"
              >
                Save
              </FButton>
            </TabList>

            <TabPanels v-if="config" as="div" max-w-4xl>
              <FTabPanel desc="Fine tune your FIRE plan">
                <div grid grid-cols-3 gap-x-4 gap-y-6>
                  <FInput
                    v-model="config.fiConfig.yearlyIncome"
                    label="Yearly income"
                    placeholder="3500"
                    icon="tabler:currency-euro"
                    type="number"
                  />

                  <FInput
                    v-model="config.fiConfig.yearlyExpenditure"
                    label="Yearly expenditure"
                    placeholder="2250"
                    icon="tabler:currency-euro"
                    type="number"
                  />

                  <FInput
                    v-model="config.yearlyNet"
                    readonly
                    label="Yearly net"
                    icon="tabler:currency-euro"
                    type="number"
                  />

                  <FInput
                    v-model="config.fiConfig.safeWithdrawalRate"
                    label="Safe withdrawal rate"
                    placeholder="4%"
                    icon="tabler:percentage"
                    type="number"
                    :input-props="{ min: 0, max: 100 }"
                  />

                  <FInput
                    v-model="config.fiConfig.yearlyInvestment"
                    label="Yearly investments"
                    placeholder="2250"
                    icon="tabler:currency-euro"
                    :input-props="{ min: 0, max: config.yearlyNet }"
                    type="number"
                  />

                  <FInput
                    v-model="config.yearlyCashSavings"
                    readonly
                    label="Yearly savings"
                    icon="tabler:currency-euro"
                    type="number"
                  />
                </div>
              </FTabPanel>

              <FTabPanel desc="Your government pension parameters">
                <div grid grid-cols-3 gap-x-4 gap-y-6>
                  <FInput
                    v-model="config.generalConfig.pensionAccessibilityAge"
                    label="Pension accessability age"
                    placeholder="55"
                    type="number"
                    :input-props="{ min: 20, max: 120 }"
                  />

                  <FInput
                    v-model="config.dobString"
                    label="Birth date"
                    placeholder="10.12.1999."
                    type="date"
                  />

                  <FInput
                    v-model="config.age"
                    label="Current age"
                    type="number"
                    readonly
                    :input-props="{ min: 1, max: 120 }"
                  />
                </div>
              </FTabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </div>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
