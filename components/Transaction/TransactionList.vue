<script setup lang="ts">
const { hasTransactions, transactions, query } = toRefs(useTransactionsStore())
</script>

<template>
  <!-- v-auto-animate -->
  <FCard
    paddingless
    white
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9"
  >
    <template v-if="hasTransactions">
      <TransactionItem
        v-for="transaction in transactions"
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
        v-if="query.isLoading"
        flex
        gap-4
        items-center
      >
        <FLoader />
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

