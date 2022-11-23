import { get, set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transaction'

export const useTransactionsStore = defineStore('transactions', () => {
  const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

  // Filters
  const searchQuery = ref('')
  const setSearchQuery = (value: string) => set(searchQuery, value)
  const clearSearchQuery = () => set(searchQuery, '')

  watch([rangeFrom, rangeTo], clearSearchQuery)

  const search = (transaction: TransactionWithCategoryAndCashAccount) => {
    const match = (str?: string | null) => !!str?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchName = match(transaction.name)
    const matchDescription = match(transaction?.description)
    const matchCategory = match(transaction.category?.name)
    const fromAccount = match(transaction.fromAccount?.account.name)
    const toAccount = match(transaction.toAccount?.account.name)

    const filters = [matchName, matchDescription, matchCategory, fromAccount, toAccount]

    return filters.some(Boolean)
  }

  // Transactions

  // TODO: have store only have this in it, the rest is from shared composable to be used throhgout componnets
  const query = useTransactions(rangeFrom, rangeTo)

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
