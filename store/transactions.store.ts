import { get, set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transactions'

export const useTransactionsStore = defineStore('transactions', () => {
  const { rangeStart, rangeEnd } = toRefs(useDateRangeStore())

  // Filters
  const searchQuery = ref('')
  const setSearchQuery = (value: string) => set(searchQuery, value)
  const clearSearchQuery = () => set(searchQuery, '')

  watch([rangeStart, rangeEnd], clearSearchQuery)

  const search = (transaction: TransactionWithCategoryAndCashAccount) => {
    const matchName = transaction.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchDescription = transaction.description?.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = transaction.category?.name.toLowerCase().includes(searchQuery.value.toLowerCase())

    const filters = [matchName, matchDescription, matchCategory]
    console.log('transaction.name :>> ', transaction.name, filters.some(Boolean))
    return filters.some(Boolean)
  }

  // Transactions

  const query = useTransactions(rangeStart, rangeEnd)

  const filteredTransactions = computed(() => get(query.data)?.filter(search) ?? [])
  const transactions = computed(() => get(filteredTransactions))
  const hasTransactions = computed(() => get(transactions)?.length)

  return {
    query,
    transactions,
    hasTransactions,
    // Filters
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot))
}
