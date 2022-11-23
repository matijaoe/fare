<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
]))

const { transactions, query } = toRefs(useTransactionsStore())

const transactionStore = useTransactionsStore()
</script>

<template>
  <LayoutPageWithList>
    <template #list>
      <FInput
        v-model="transactionStore.searchQuery"
        type="search"
        placeholder="Search"
        icon="tabler:search"
        clearable
        input-class="rounded-none !bg-white !py-5"
        border="b-2 zinc-2 dark:zinc-9"
      />
      <TransactionList
        :transactions="transactions"
        :loading="query.isFetching"
      />
    </template>

    <template #content>
      <TransactionsHead />
      <TransactionCharts />
    </template>
  </LayoutPageWithList>
</template>
