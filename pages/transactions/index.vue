<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
]))

const { transactions, query } = toRefs(useTransactionsStore())

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
          <TransactionCharts />
        </div>
      </div>
    </LayoutSectionWrapper>
  </div>
</template>
