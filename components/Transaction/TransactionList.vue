<script setup lang="ts">
const trStore = useTransactionsStore()
</script>

<template>
  <!-- v-auto-animate -->
  <FCard
    paddingless
    white
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9"
  >
    <template v-if="trStore.hasTransactions">
      <TransactionItem
        v-for="transaction in trStore.transactions"
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
        v-if="trStore.pending"
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

