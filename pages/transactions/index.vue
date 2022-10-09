<script lang="ts" setup>
const transactionStore = useTransactionsStore()
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
          <TransactionList />
        </div>
        <div flex-1 class="order--1 xl:order-1">
          <FInput
            v-model="transactionStore.searchQuery"
            type="search"
            placeholder="Search"
            icon="tabler:search"
          />
        </div>
      </div>

      <TransactionAddBar
        fixed
        pos="bottom-6 right-6"
      />
    </div>
  </LayoutSectionWrapper>
</template>
