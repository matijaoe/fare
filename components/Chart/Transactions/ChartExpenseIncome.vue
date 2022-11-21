<script lang="ts" setup>
import type { ChartData, ChartDataset, ChartOptions } from 'chart.js'

const props = defineProps<{
  type: 'line' | 'bar' | 'pie'
  datasets: ChartDataset[]
  labels: string[]
}>()

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

const options: ChartOptions = {
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
</script>

<template>
  <bar-chart
    v-if="type === 'bar'"
    :height="250"
    :chart-options="options"
    :chart-data="data"
  />
  <line-chart
    v-if="type === 'line'"
    :height="250"
    :chart-options="options"
    :chart-data="data"
  />
  <pie-chart
    v-if="type === 'pie'"
    :height="250"
    :chart-options="options"
    :chart-data="data"
  />
</template>
