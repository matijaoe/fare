<script setup lang="ts">
import type { Transaction } from '@prisma/client'

const props = defineProps<{
  transactions: Transaction[]
  loading: boolean
}>()

const hasTransactions = computed(() => props.transactions?.length)
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
        v-if="loading"
        flex
        gap-4
        items-center
      >
        <FLoader />
        <p>Fetching transactions</p>
      </div>
      <div
        v-else
        flex
        gap-4
        items-center
      >
        <Icon name="tabler:cash-banknote-off" />
        <p>
          No transactions found
        </p>
      </div>
    </div>
  </FCard>
</template>

