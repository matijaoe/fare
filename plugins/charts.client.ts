import { Bar, Doughnut, Line } from 'vue-chartjs'
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale, PointElement, Title, Tooltip,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
)

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('bar-chart', Bar)
  nuxtApp.vueApp.component('line-chart', Line)
  nuxtApp.vueApp.component('doughnut-chart', Doughnut)
})
