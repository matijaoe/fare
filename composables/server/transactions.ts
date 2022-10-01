import type { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { computed } from 'vue'
import type { CashAccountsQueryModel } from '~~/models/resources/account'

export const useTransactionDateRange = (event: H3Event) => {
  const { start, end, transactions } = useQuery(event) as CashAccountsQueryModel

  const startDate = start ? new Date(start) : undefined
  const endDate = end ? new Date(end) : undefined

  const hasDefinedRange = computed(() => startDate || endDate)

  const withTransactions = computed(() => (hasDefinedRange.value && transactions !== 'false') || transactions === 'true')

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
    hasDefinedRange: hasDefinedRange.value,
    withTransactions: withTransactions.value,
  }
}
