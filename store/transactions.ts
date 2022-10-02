import type { Transaction } from '@prisma/client'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transactions'

export const useTransactionsStore = defineStore('transactions', () => {
  const rangeStore = useDateRangeStore()

  const storedTransactions = ref<Transaction[]>([])
  const storeTransactions = (value: Transaction[]) => set(storedTransactions, value ?? [])

  const fetchState = useTransactions(toRef(rangeStore, 'dateRange'))

  watch(fetchState.data, (value) => {
    storeTransactions(value ?? [])
  }, { immediate: true })

  // Filters
  const query = ref('')
  const setQuery = (value: string) => set(query, value)
  const clearQuery = () => set(query, '')

  watch(() => rangeStore.dateRange, clearQuery)

  const search = (transaction: TransactionWithCategoryAndCashAccount) => {
    const matchName = transaction.name.toLowerCase().includes(query.value.toLowerCase())
    const matchDescription = transaction.description?.toLowerCase().includes(query.value.toLowerCase())
    const matchCategory = transaction.category?.name.toLowerCase().includes(query.value.toLowerCase())

    return [matchName, matchDescription, matchCategory].some(Boolean)
  }

  const filteredTransactions = computed(() => get(storedTransactions).filter(search))

  const hasStoredTransactions = computed(() => get(storedTransactions)?.length)

  const transactions = computed(() =>
    get(hasStoredTransactions)
      ? get(filteredTransactions)
      : get(fetchState.data) ?? [],
  )

  const hasTransactions = computed(() => get(transactions)?.length)

  return {
    ...fetchState,
    transactions: fetchState.data,
    hasTransactions,
    setTransactions: storeTransactions,
    // filters
    query,
    setQuery,
    clearQuery,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionsStore, import.meta.hot))
}
