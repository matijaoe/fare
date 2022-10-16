<script lang="ts" setup>
const { transactions, query } = toRefs(useTransactionsStore())
const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
])

await useFetch(`/api/transactions?from=${rangeFrom.value}&to=${rangeTo.value}`, {
  key: `transactions-${rangeFrom.value}-${rangeTo.value}`,
})
</script>

<template>
  <LayoutSectionWrapper pb-18>
    <div relative>
      <DateSwitchHeader mb-6 />

      <div
        w-full
        flex="~ col xl:row"
        justify-between
        gap-6
        mt-8
        flex-1
      >
        <div
          max-w="full xl:base"
          flex-1
        >
          <TransactionList :transactions="transactions" :loading="query.isFetching" />
        </div>
        <div flex-1 class="order--1 xl:order-1">
          <TransactionFilters />
        </div>
      </div>

      <TransactionAddBar
        fixed
        pos="bottom-6 right-6"
      />
    </div>
  </LayoutSectionWrapper>
</template>
