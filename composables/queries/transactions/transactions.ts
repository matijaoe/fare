import type { Transaction } from '@prisma/client'
import type { ComputedRef, Ref } from 'nuxt/dist/app/compat/capi'
import type { DateRange } from '~~/models/resources/account'

export const useTransactions = (params: Ref<DateRange> | ComputedRef<DateRange>) =>
  useFetch<Transaction[]>(() => `/api/transactions?start=${params.value.start}&end=${params.value.end}`)
