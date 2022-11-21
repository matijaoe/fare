<script setup lang="ts">
import { RadioGroup, RadioGroupOption } from '@headlessui/vue'

const tension = 0.5
const skipped = (ctx: any, value: any) => ctx.p0.skip || ctx.p1.skip ? value : undefined
const down = (ctx: any, value: any) => ctx.p0.parsed.y > ctx.p1.parsed.y ? value : undefined

// TODO:
const monthCount = useLocalStorage('fare-month-range', 3)

// Dates
const { labels, expenseTotals, incomeTotals } = $(useMonthlyTotals(useTransactionTotalMonthly().data, monthCount))

const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: 'Expenses',
      data: expenseTotals,
      borderColor: '#FF9494',
      backgroundColor: '#FF9494',
      segment: {
        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      tension,
    },
    {
      label: 'Income',
      data: incomeTotals,
      borderColor: '#B6E388',
      backgroundColor: '#B6E388',
      segment: {
        borderColor: (ctx: any) => skipped(ctx, 'rgb(0,0,0,0.2)') || down(ctx, 'rgb(192,75,75)'),
        borderDash: (ctx: any) => skipped(ctx, [6, 6]),
      },
      spanGaps: true,
      tension,
    },
  ],
}))

const chartOptions = { responsive: true, maintainAspectRatio: true }

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

    <div
      flex="~ col 2xl:row gap-8"
    >
      <bar-chart
        flex-1
        w-full
        :height="250"
        :chart-options="chartOptions"
        :chart-data="chartData"
      />
      <line-chart
        flex-1
        w-full
        :height="250"
        :chart-data="chartData"
        :chart-options="chartOptions"
      />
    </div>
  </div>
</template>

