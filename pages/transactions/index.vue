<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
]))

const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())
const { data, isLoading } = useTransactions(rangeFrom, rangeTo)

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
        input-class="rounded-none !bg-white !py-5"
        border="b-2 zinc-2 dark:zinc-9"
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
