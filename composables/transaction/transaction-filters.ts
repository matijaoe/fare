import { get, set } from '@vueuse/core'
import type { Ref } from 'vue'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources'

export const useTransactionFilters = (_transactions: Ref<TransactionWithCategoryAndCashAccount[] | undefined>) => {
  const { monthQuery } = toRefs(useDateRangeStore())

  // Filters
  const searchQuery = ref('')
  const setSearchQuery = (value: string) => set(searchQuery, value)
  const clearSearchQuery = () => set(searchQuery, '')

  watch(monthQuery, clearSearchQuery)

  const search = (transaction: TransactionWithCategoryAndCashAccount) => {
    const match = (str?: string | null) => !!str?.toLowerCase().includes(searchQuery.value.toLowerCase())

    // TODO: filter callbacks should be passed as option in props
    // as well as the transaction object type as a generic, to not include everything in same request
    // ie. dont need nested includes of category on category-id page
    const matchName = match(transaction.name)
    const matchDescription = match(transaction?.description)
    const matchCategory = match(transaction.category?.name)
    const fromAccount = match(transaction.fromAccount?.account.name)
    const toAccount = match(transaction.toAccount?.account.name)

    const filters = [matchName, matchDescription, matchCategory, fromAccount, toAccount]

    return filters.some(Boolean)
  }

  // Transactions
  const filteredTransactions = computed(() => get(_transactions)?.filter(search) ?? [])
  const transactions = computed(() => get(filteredTransactions))
  const hasTransactions = computed(() => get(transactions)?.length)

  return {
    transactions,
    hasTransactions,
    // Filters
    searchQuery,
    setSearchQuery,
    clearSearchQuery,
  }
}
