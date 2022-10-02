import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'

export const useDateRangeStore = defineStore('date-range', () => {
  const { $dayjs } = useNuxtApp()

  const selectedMonth = ref($dayjs())

  const setPreviousMonth = () => set(selectedMonth, get(selectedMonth).subtract(1, 'month'))
  const setToToday = () => set(selectedMonth, $dayjs())
  const setNextMonth = () => set(selectedMonth, get(selectedMonth).add(1, 'month'))

  const isLatestMonth = computed(() =>
    get(selectedMonth).isSame($dayjs(), 'month'),
  )

  const dateRange = computed(() => ({
    start: get(selectedMonth).startOf('month').format('YYYY-MM-DD'),
    end: get(selectedMonth).endOf('month').format('YYYY-MM-DD'),
  }))

  const formattedDate = computed(() => {
    const date = get(selectedMonth)
    const isCurrentYear = date.isSame($dayjs(), 'year')
    return date.format(isCurrentYear ? 'MMMM' : 'MMMM YYYY')
  })

  return {
    selectedMonth,
    setPreviousMonth,
    setToToday,
    setNextMonth,
    isLatestMonth,
    formattedDate,
    dateRange,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateRangeStore, import.meta.hot))
}
