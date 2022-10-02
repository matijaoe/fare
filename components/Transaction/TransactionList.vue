<script setup lang="ts">
const store = useDateRangeStore()

const { data: transactions, pending } = useTransactions(toRef(store, 'dateRange'))
</script>

<template>
  <Transition>
    <FCard
      v-if="!pending"
      paddingless
      white
      flex="~ col"
      divide="y-2 dashed zinc-2 dark:zinc-9"
    >
      <template v-if="transactions?.length">
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
        min-h-40
        flex-center
      >
        <div flex gap-4 items-center>
          <Icon name="tabler:cash-banknote-off" />
          <p>
            No transactions this month
          </p>
        </div>
      </div>
    </FCard>
  </Transition>
</template>

