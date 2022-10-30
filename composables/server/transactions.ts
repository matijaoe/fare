import type { Prisma } from '@prisma/client'
import type { H3Event } from 'h3'
import { computed } from 'vue'
import type { CashAccountsQueryModel } from '~~/models/resources/account'

export const useTransactionDateRange = (event: H3Event) => {
  const { from, to, transactions } = useQuery(event) as CashAccountsQueryModel

  const fromDate = from ? new Date(from) : undefined
  const toDate = to ? new Date(to) : undefined

  const hasDefinedRange = computed(() => !!fromDate || !!toDate)

  const withTransactions = computed(() => (hasDefinedRange.value && transactions !== 'false') || transactions === 'true')

  const dateQuery = computed<string | Date | Prisma.DateTimeFilter | undefined>(() => {
    return {
      gte: fromDate,
      lte: toDate,
    }
  })

  return {
    startDate: fromDate,
    endDate: toDate,
    dateQuery: dateQuery.value,
    hasDefinedRange: hasDefinedRange.value,
    withTransactions: withTransactions.value,
  }
}
