import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import { addMonths, endOfMonth, format, isSameMonth, isThisYear, startOfMonth, subMonths } from 'date-fns'

export const useDateRangeStore = defineStore('date-range', () => {
  const now = $(useNow())

  const formatType = {
    full: 'yyyy-MM-dd',
    monthYear: 'MMM yy',
    month: 'MMM',
  }

  const selectedMonth = ref<Date | number>(now)

  const isAllTime = ref(false)
  const toggleAllTime = useToggle(isAllTime)
  const setAllTime = (value: boolean) => set(isAllTime, value)

  const setPreviousMonth = () => set(selectedMonth, subMonths(get(selectedMonth), 1))
  const setNextMonth = () => set(selectedMonth, addMonths(get(selectedMonth), 1))
  const setToToday = () => {
    set(selectedMonth, now)
    setAllTime(false)
  }

  const isLatestMonth = computed(() => isSameMonth(get(selectedMonth), now))

  const rangeStart = computed(() => !get(isAllTime) ? format(startOfMonth(get(selectedMonth)), formatType.full) : undefined)
  const rangeEnd = computed(() => !get(isAllTime) ? format(endOfMonth(get(selectedMonth)), formatType.full) : undefined)

  const dateRange = computed(() => ({
    start: rangeStart,
    end: rangeEnd,
  }))

  const formattedDate = computed(() => {
    const date = get(selectedMonth)
    return format(date, isThisYear(date) ? formatType.month : formatType.monthYear)
  })

  return {
    selectedMonth,
    isAllTime,
    toggleAllTime,
    setAllTime,
    setPreviousMonth,
    setToToday,
    setNextMonth,
    isLatestMonth,
    formattedDate,
    dateRange,
    rangeStart,
    rangeEnd,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateRangeStore, import.meta.hot))
}
