<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'
import type { ChartData, ChartOptions } from 'chart.js'

const tension = 0.5
const skipped = (ctx: any, value: any) => ctx.p0.skip || ctx.p1.skip ? value : undefined
const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined

// TODO:
const monthCount = ref(3)

// Dates
const { labels, expenseTotals, incomeTotals, netTotals } = $(useMonthlyTotals(useTransactionTotalMonthly().data, monthCount))
const datasets = $computed(() => ({
  expense: { label: 'Expenses', data: expenseTotals, color: '#f87171' },
  income: { label: 'Income', data: incomeTotals, color: '#34d399' },
  net: { label: 'Net', data: netTotals, color: '#fbbf24' },
}))

const expenseAndIncomeAndNetData = computed<ChartData>(() => ({
  labels,
  datasets: [datasets.expense, datasets.income, datasets.net].map(({ label, color, data }) => ({
    label,
    data,
    borderRadius: 5,
    backgroundColor: color,
    borderColor: color,
    spanGaps: true,
    borderSkipped: false,
    fill: true,
  })),
}))

const expenseAndIncomeData = computed<ChartData>(() => ({
  labels,
  datasets: [datasets.expense, datasets.income].map(({ label, color, data }) => ({
    label,
    data,
    borderRadius: 5,
    backgroundColor: color,
    borderColor: color,
    spanGaps: true,
    borderSkipped: false,
    fill: true,
  })),
}))

const monthlyNetData = computed<ChartData>(() => ({
  labels,
  datasets: [datasets.net].map(({ label, color, data }) => ({
    label,
    data,
    borderRadius: 5,
    backgroundColor: color,
    borderColor: color,
    spanGaps: true,
    borderSkipped: false,
    fill: true,
  })),
}))

const chartOptionsShared: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      ticks: {
        callback: (value: any) => {
          const absValue = Math.abs(value)
          return `${value < 0 ? '-' : ''}€${absValue}`
        },
      },
    },
    x: { },
  },
  plugins: {
    tooltip: {
      mode: 'index',
      position: 'nearest',
      callbacks: {
        label: (ctx: any) => {
          const label = ctx.dataset.label || ''
          const value = parseInt(ctx.parsed.y)
          const absValue = Math.abs(value)
          return `${label}: ${value < 0 ? '-' : ''}€${absValue}`
        },
      },
    },
    legend: { position: 'bottom' },
  },
}

const chartOptionsStacked: ChartOptions = {
  ...chartOptionsShared,
  scales: {
    ...chartOptionsShared.scales,
    x: {
      ...chartOptionsShared.scales?.x,
      stacked: true,
    },
    y: {
      ...chartOptionsShared.scales?.y,
      stacked: true,
    },
  },
}

const monthCountOptions = [3, 6, 12, 24].map(value => ({ label: `${value} mo`, value }))
</script>

<template>
  <div space-y-8>
    <RadioGroup v-model="monthCount" flex justify-center>
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

    <div grid grid-cols-1 xl:grid-cols-2 gap-8>
      <bar-chart
        flex-1
        w-full
        :height="250"
        :chart-options="chartOptionsShared"
        :chart-data="expenseAndIncomeData"
      />
      <bar-chart
        flex-1
        w-full
        :height="250"
        :chart-options="chartOptionsShared"
        :chart-data="monthlyNetData"
      />
      <line-chart
        flex-1
        w-full
        :height="250"
        :chart-options="chartOptionsStacked"
        :chart-data="expenseAndIncomeAndNetData"
      />
      <line-chart
        flex-1
        w-full
        :height="250"
        :chart-data="expenseAndIncomeData"
        :chart-options="chartOptionsShared"
      />
    </div>
  </div>
</template>

