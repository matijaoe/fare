<script setup lang="ts">
const store = useDateRangeStore()

const { data: transactions, pending } = useTransactions(toRef(store, 'dateRange'))
const transactionsStore = useTransactionsStore()

const shownTransactions = computed(() => {
  return transactionsStore.hasTransactions
    ? transactionsStore.transactions
    : transactions.value
})

watch(transactions, (value) => {
  transactionsStore.setTransactions(value)
}, { immediate: true })
</script>

<template>
  <FCard
    v-auto-animate
    paddingless
    white
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9"
  >
    <template v-if="shownTransactions?.length">
      <TransactionItem
        v-for="transaction in shownTransactions"
        :key="transaction.id"
        :item="transaction"
      />
    </template>
    <div
      v-else
      flex
      gap-4
      min-h="244px"
      flex-center
    >
      <div
        v-if="pending"
        flex
        gap-4
        items-center
      >
        <Icon name="tabler:loader-2" class="animate-spin" />
        <p>Fetching your transactions</p>
      </div>
      <div
        v-else
        flex
        gap-4
        items-center
      >
        <Icon name="tabler:cash-banknote-off" />
        <p>
          No transactions this month
        </p>
      </div>
    </div>
  </FCard>
</template>

