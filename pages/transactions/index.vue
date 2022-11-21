<script lang="ts" setup>
import { get } from '@vueuse/core'

onMounted(() => setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
]))

const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())
const { transactions, query } = toRefs(useTransactionsStore())

await useFetch(() => `/api/transactions/totals?from=${get(rangeFrom.value)}&to=${get(rangeTo)}`, {
  key: `transactions-totals-${get(rangeFrom.value)}-${get(rangeTo)}`,
})

// // Fucks things up?
// await useFetch(() => `/api/transactions?from=${get(rangeFrom)}&to=${get(rangeTo)}`, {
//   key: `transactions-${get(rangeFrom)}-${get(rangeTo)}`,
// })
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-60px)]')

const transactionStore = useTransactionsStore()
</script>

<template>
  <div>
    <LayoutSectionWrapper>
      <div
        w-full flex="~ col xl:row 1" justify-between
      >
        <div
          max-w="full xl:lg" flex-1
          border="r-2 zinc-2 dark:zinc-9"
        >
          <FInput
            v-model="transactionStore.searchQuery"
            type="search"
            placeholder="Search"
            icon="tabler:search"
            input-class="rounded-none !bg-white !py-5"
          />
          <TransactionList
            border="t-2 zinc-2 dark:zinc-9"
            :transactions="transactions"
            :loading="query.isFetching"
          />
        </div>

        <div
          p-6 pb-32 space-y-12 overflow-y-scroll
          flex-1 order--1 xl:order-1
          :class="mainContentWrapperHeight"
        >
          <TransactionsHead />
          <ChartDemo />
        </div>
      </div>
    </LayoutSectionWrapper>
  </div>
</template>
