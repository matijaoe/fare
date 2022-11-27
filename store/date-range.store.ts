import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import { addMonths, endOfMonth, format, isSameMonth, isThisYear, startOfMonth, subMonths } from 'date-fns'

export const useDateRangeStore = defineStore('date-range', () => {
  const now = $(useNow())

  const formatType = {
    full: 'yyyy-MM-dd',
    monthYear: 'MMM yy',
    yearMonth: 'yyyy-MM',
    month: 'MMMM',
  }

  // TODO: save in local storage
  // Start of month
  const selectedMonth = ref<Date>(startOfMonth(now))

  const isAllTime = ref(false)
  const setAllTime = (value: boolean) => set(isAllTime, value)

  const setPreviousMonth = () => set(selectedMonth, subMonths(get(selectedMonth), 1))
  const setNextMonth = () => set(selectedMonth, addMonths(get(selectedMonth), 1))
  const setToToday = () => {
    set(selectedMonth, startOfMonth(now))
    setAllTime(false)
  }

  const isLatestMonth = computed(() => isSameMonth(get(selectedMonth), now))

  const rangeFrom = computed(() => !get(isAllTime) ? format(startOfMonth(get(selectedMonth)), formatType.full) : undefined)
  const rangeTo = computed(() => !get(isAllTime) ? format(endOfMonth(get(selectedMonth)), formatType.full) : undefined)

  const hasDefinedRange = computed(() => get(rangeFrom) && get(rangeTo))

  const formattedDate = computed(() => {
    const date = get(selectedMonth)
    return format(date, isThisYear(date) ? formatType.month : formatType.monthYear)
  })

  const isCurrentMonth = computed(() => isSameMonth(now, get(selectedMonth)))

  // TODO: implement throughout
  const monthQuery = computed(() => !get(isAllTime) ? format(get(selectedMonth), formatType.yearMonth) : undefined)
  // const monthStartDate = computed(() => startOfMonth(get(selectedMonth)))
  // const monthEndDate = computed(() => endOfMonth(get(selectedMonth)))

  return {
    selectedMonth,
    isAllTime,
    setAllTime,
    setPreviousMonth,
    setToToday,
    setNextMonth,
    isLatestMonth,
    formattedDate,
    rangeFrom,
    rangeTo,
    hasDefinedRange,
    isCurrentMonth,
    // TODO: wip
    monthQuery,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDateRangeStore, import.meta.hot))
}
