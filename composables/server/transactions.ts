import type { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { computed } from 'vue'

export const useTransactionDateRange = (event: H3Event) => {
  const { start, end } = useQuery(event) as { start?: string; end?: string }

  const startDate = start ? new Date(start) : undefined
  const endDate = end ? new Date(end) : undefined

  const dateQuery = computed<string | Date | Prisma.DateTimeFilter | undefined>(() => {
    return {
      gte: startDate,
      lte: endDate,
    }
  })

  return {
    startDate,
    endDate,
    dateQuery: dateQuery.value,
  }
}
