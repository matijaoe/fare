<script lang="ts" setup>
const { monthQuery } = toRefs(useDateRangeStore())
const { data, isLoading } = useTransactions(monthQuery)
const { transactions, searchQuery } = useTransactionFilters(data)
</script>

<template>
  <LayoutPageWithList>
    <template #list>
      <FInput
        v-model="searchQuery"
        type="search"
        placeholder="Search"
        icon="tabler:search"
        clearable
        input-class="rounded-none !bg-white !dark:bg-zinc-9 !py-5"
        border="base b-2"
      />
      <TransactionList
        :transactions="transactions"
        :loading="isLoading"
      />
    </template>

    <template #content>
      <TransactionsHead />
      <TransactionCharts />
    </template>
  </LayoutPageWithList>
</template>
