<script setup lang="ts">
const { data: transactions } = useTransactions({
  start: '2022-07-01',
  end: '2022-09-30',
})

const hasTransactions = computed(() => transactions.value?.length)
</script>

<template>
  <FCard
    v-if="hasTransactions"
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

