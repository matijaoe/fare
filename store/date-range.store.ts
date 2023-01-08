import { get, set } from '@vueuse/core'
import { addMonths, format, isSameMonth, isThisMonth, isThisYear, startOfMonth, subMonths } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useDateRangeStore = defineStore('date-range', () => {
  const now = $(useNow())

  const formatType = {
    monthYear: 'MMM yy',
    yearMonth: 'yyyy-MM',
    month: 'MMMM',
  }

  const selectedMonth = ref(startOfMonth(now))

  const isAllTime = ref(false)
  const setAllTime = (value: boolean) => set(isAllTime, value)

  const setPreviousMonth = () => set(selectedMonth, subMonths(get(selectedMonth), 1))
  const setNextMonth = () => set(selectedMonth, addMonths(get(selectedMonth), 1))
  const setToToday = () => {
    set(selectedMonth, startOfMonth(now))
    setAllTime(false)
  }

  const monthQuery = computed(() => !get(isAllTime) ? format(get(selectedMonth), formatType.yearMonth) : undefined)
  const formattedDate = computed(() => {
    const date = get(selectedMonth)
    return format(date, isThisYear(date) ? formatType.month : formatType.monthYear)
  })

  const isLatestMonth = computed(() => isSameMonth(get(selectedMonth), now))
  const isCurrentMonth = computed(() => isThisMonth(get(selectedMonth)))

  return {
    selectedMonth,
    isAllTime,
    setAllTime,
    setPreviousMonth,
    setToToday,
    setNextMonth,
    formattedDate,
    monthQuery,
    isLatestMonth,
    isCurrentMonth,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateRangeStore, import.meta.hot))
}
