<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import type { ChartDataset } from 'chart.js'

const monthCount = ref(6)
const resetMonthCount = () => monthCount.value = 6

const { labels, expenseTotals, incomeTotals, netTotals } = $(useMonthlyTotals(useTransactionTotalMonthly().data, monthCount))

const datasets = $computed<Record<'expense' | 'income' | 'net', ChartDataset>>(() => ({
  expense: {
    label: 'Expenses',
    data: expenseTotals,
    backgroundColor: '#fb7185',
    borderColor: '#e11d48',
    borderWidth: 3,
  },
  income: {
    label: 'Income',
    data: incomeTotals,
    backgroundColor: '#34D399',
    borderColor: '#059669',
    borderWidth: 3,
  },
  net: {
    label: 'Savings',
    data: netTotals,
    backgroundColor: '#fbbf24',
    borderColor: '#d97706',
    borderWidth: 3,
  },
}))

const datasetArrExpenseIncomeNetHidden = $computed<ChartDataset[]>(() => ([
  datasets.expense,
  datasets.income,
  { ...datasets.net, hidden: true },
]))

const monthCountOptions = [
  { value: 3, label: '3 mo' },
  { value: 6, label: '6 mo' },
  { value: 12, label: '1 yr' },
  { value: 24, label: '2 yrs' },
]
const isCustom = $computed(() => !monthCountOptions.map(({ value }) => value).includes(monthCount.value))
</script>

<template>
  <div space-y-8>
    <div grid grid-cols="[90px_1fr_90px]" overflow-x-auto>
      <div />
      <div flex gap-2 justify-center>
        <FTooltip content="Subtract month">
          <FButton :disabled="monthCount <= 1" size="sm" variant="secondary" @click="monthCount--">
            -
          </FButton>
        </FTooltip>
        <RadioGroup v-model="monthCount" flex-shrink-0>
          <div flex gap-2 text-center>
            <RadioGroupOption
              v-for="option in monthCountOptions"
              :key="option.value"
              v-slot="{ checked }"
              :value="option.value"
            >
              <FButton size="sm" :variant="checked ? 'primary' : 'secondary'">
                {{ option.label }}
              </FButton>
            </RadioGroupOption>
          </div>
        </RadioGroup>
        <FTooltip content="Add month">
          <FButton :disabled="monthCount >= 48" size="sm" variant="secondary" @click="monthCount++">
            +
          </FButton>
        </FTooltip>
      </div>
      <div flex justify-end>
        <FTooltip v-if="isCustom" content="Custom time frame">
          <FButton size="sm" variant="info">
            <div flex items-center gap-2>
              <p>{{ monthCount }} mo</p>
              <div flex items-center justify-center class="hover:bg-sky-2" rounded-full @click.stop="resetMonthCount">
                <Icon name="tabler:x" text-xs />
              </div>
            </div>
          </FButton>
        </FTooltip>
      </div>
    </div>

    <div grid="~ cols-1 2xl:cols-2 gap-8">
      <ChartExpenseIncome
        type="bar"
        flex-1
        w-full
        :labels="labels"
        :datasets="datasetArrExpenseIncomeNetHidden"
      />
      <ChartExpenseIncome
        type="line"
        flex-1
        w-full
        :labels="labels"
        :datasets="[datasets.expense, datasets.income, datasets.net]"
      />
      <ChartExpenseIncome
        type="pie"
        flex-1
        w-full
        :labels="labels"
        :datasets="[datasets.expense, datasets.income, datasets.net]"
      />
      <ChartExpenseIncome
        type="bar"
        flex-1
        w-full
        :labels="labels"
        :datasets="[datasets.net]"
      />
    </div>
  </div>
</template>

