<script lang="ts" setup>
import type { ChartData, ChartDataset, ChartOptions } from 'chart.js'

const props = withDefaults(defineProps<{
  datasets: ChartDataset[]
  labels: string[]
  height?: number
}>(), {
  type: 'line',
  height: 250,
})

const buildDataset = (_dataset: ChartDataset[]): ChartData => ({
  labels: props.labels,
  datasets: _dataset.map(singleDataset => ({
    ...singleDataset,
    fill: true,
    borderWidth: 3,
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
    filler: {
      propagate: false,
    },
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
  <line-chart
    :height="height"
    :chart-options="lineBarOptions"
    :chart-data="data"
  />
</template>
