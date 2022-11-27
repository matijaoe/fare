import type { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { computed } from 'vue'
import type { DateRange } from '~~/models'

export const useTransactionDateRange = (event: H3Event) => {
  const { from, to } = getQuery(event) as DateRange

  const fromDate = from ? new Date(from) : undefined
  const toDate = to ? new Date(to) : undefined

  const hasDefinedRange = computed(() => !!fromDate && !!toDate)

  const dateQuery = computed<string | Date | Prisma.DateTimeFilter | undefined>(() => {
    return {
      gte: fromDate,
      lte: toDate,
    }
  })

  return {
    startDate: fromDate,
    endDate: toDate,
    date: dateQuery.value,
    hasDefinedRange: hasDefinedRange.value,
  }
}
