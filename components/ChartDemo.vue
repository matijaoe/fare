<script setup lang="ts">
const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Income',
      backgroundColor: '#f87979',
      data: [10, 20, 10, 15, 24, 28, 4, 12, 14, 16, 15, 12, 20],
    },
    {
      label: 'Expenses',
      backgroundColor: '#bada',
      data: [16, 15, 12, 20, 10, 20, 10, 15, 24, 28, 4, 12, 14],
    },
  ],
}
</script>

<template>
  <ClientOnly>
    <div max-w-lg w-full mx-auto>
      <!-- <bar-chart
        :chart-options="{
          responsive: true,
        }"
        :chart-data="chartData"
      /> -->
      <line-chart
        :chart-data="chartData"
        :plugins="{
          legend: { positition: 'botttom' },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        }"
      />
    </div>
  </ClientOnly>
</template>

