<script lang="ts" setup>
import { get } from '@vueuse/core'
const { transactions, query } = toRefs(useTransactionsStore())
const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
])

// Fucks things up
// await useFetch(`/api/transactions?from=${get(rangeFrom)}&to=${get(rangeTo)}`, {
//   key: `transactions-${get(rangeFrom)}-${get(rangeTo)}`,
// })
</script>

<template>
  <LayoutPageLayout range pb-18>
    <LayoutSectionWrapper>
      <div
        w-full
        flex="~ col xl:row"
        justify-between
        gap-6
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
        bottom-6
        right-6
      />
    </LayoutSectionWrapper>
  </LayoutPageLayout>
</template>
