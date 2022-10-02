<script setup lang="ts">
// const store = useDateRangeDayjsStore()
const store = useDateRangeStore()

const { data: transactions } = useTransactions(toRef(store, 'dateRange'))
</script>

<template>
  <FCard
    v-if="transactions?.length"
    paddingless
    white
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9"
  >
    <TransactionItem
      v-for="transaction in transactions"
      :key="transaction.id"
      :item="transaction"
    />
  </FCard>
</template>

