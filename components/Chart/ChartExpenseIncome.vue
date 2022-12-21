<script lang="ts" setup>
import type { ChartData, ChartDataset, ChartOptions } from 'chart.js'

const props = withDefaults(defineProps<{
  type?: 'line' | 'bar' | 'pie'
  datasets: ChartDataset[]
  labels: string[]
  height?: number
}>(), {
  type: 'line',
  height: 180,
})

const buildDataset = (_dataset: ChartDataset[]): ChartData => ({
  labels: props.labels,
  datasets: _dataset.map(singleDataset => ({
    ...singleDataset,
    borderRadius: 5,
    spanGaps: true,
    borderSkipped: false,
    tension: 0.5,
    pointStyle: 'circle',
    pointRadius: 6,
    pointHoverRadius: 12,
  }) as ChartDataset),
})

const data = computed<ChartData>(() => buildDataset(props.datasets))

const lineBarOptions: ChartOptions = {
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    y: {
      ticks: {
        callback: (value: any) => {
          const absValue = Math.abs(value)
          return formatCurrency(absValue)
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
          return `${label}: ${formatCurrency(value)}`
        },
      },
    },
    legend: { position: 'bottom' },
  },
}
</script>

<template>
  <div>
    <bar-chart
      v-if="type === 'bar'"
      :height="height"
      :options="lineBarOptions"
      :data="data"
    />
    <line-chart
      v-if="type === 'line'"
      :height="height "
      :options="lineBarOptions"
      :data="data"
    />
  </div>
</template>
