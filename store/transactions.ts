import type { Transaction } from '@prisma/client'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transactions'

export const useTransactionsStore = defineStore('transactions', () => {
  const store = useDateRangeStore()

  const $transactions = ref<Transaction[]>([])

  const hasTransactions = computed(() => get($transactions)?.length)

  const setTransactions = (value?: Transaction[] | null) => set($transactions, value ?? [])

  const query = ref('')
  const setQuery = (value: string) => set(query, value)
  const clearQuery = () => set(query, '')

  watch(() => store.dateRange, clearQuery)

  const search = (transaction: TransactionWithCategoryAndCashAccount) => {
    const matchName = transaction.name.toLowerCase().includes(query.value.toLowerCase())
    const matchDescription = transaction.description?.toLowerCase().includes(query.value.toLowerCase())
    const matchCategory = transaction.category?.name.toLowerCase().includes(query.value.toLowerCase())

    return [matchName, matchDescription, matchCategory].some(Boolean)
  }

  const transactions = computed(() => {
    return $transactions.value.filter(search)
  })

  return {
    $transactions,
    transactions,
    hasTransactions,
    setTransactions,
    // filters
    query,
    setQuery,
    clearQuery,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot))
}
