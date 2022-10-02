import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import dayjs from 'dayjs'

export const useDateRangeStore = defineStore('date-range', () => {
  const today = () => dayjs()
  const formatType = {
    full: 'YYYY-MM-DD',
    monthYear: 'MMMM YYY',
    month: 'MMMM',
  }

  const selectedMonth = ref<dayjs.Dayjs | null>(today())

  const setPreviousMonth = () => set(selectedMonth, get(selectedMonth)?.subtract(1, 'month'))
  const setNextMonth = () => set(selectedMonth, get(selectedMonth)?.add(1, 'month'))
  const setToToday = () => set(selectedMonth, today())

  const isLatestMonth = computed(() =>
    get(selectedMonth)?.isSame(today(), 'month'),
  )

  const dateRange = computed(() => ({
    start: get(selectedMonth)?.startOf('month').format(formatType.full),
    end: get(selectedMonth)?.endOf('month').format(formatType.full),
  }))

  const formattedDate = computed(() => {
    const date = get(selectedMonth)
    const isCurrentYear = date?.isSame(dayjs(), 'year')
    return date?.format(isCurrentYear ? formatType.month : formatType.monthYear)
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
