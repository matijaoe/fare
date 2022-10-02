import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import { addMonths, endOfMonth, format, isSameMonth, isThisYear, startOfMonth, subMonths } from 'date-fns'

export const useDateRangeStore = defineStore('date-range', () => {
  const now = $(useNow())

  const formatType = {
    full: 'yyyy-MM-dd',
    monthYear: 'MMMM yyyy',
    month: 'MMMM',
  }

  const selectedMonth = ref<Date | number>(now)

  const setPreviousMonth = () => set(selectedMonth, subMonths(get(selectedMonth), 1))
  const setNextMonth = () => set(selectedMonth, addMonths(get(selectedMonth), 1))
  const setToToday = () => set(selectedMonth, now)

  const isLatestMonth = computed(() => isSameMonth(get(selectedMonth), now))

  const dateRange = computed(() => ({
    start: format(startOfMonth(get(selectedMonth)), formatType.full),
    end: format(endOfMonth(get(selectedMonth)), formatType.full),
  }))

  const formattedDate = computed(() => {
    const date = get(selectedMonth)
    return format(date, isThisYear(date) ? formatType.month : formatType.monthYear)
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
