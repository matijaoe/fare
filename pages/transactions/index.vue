<script lang="ts" setup>
const transactionStore = useTransactionsStore()
</script>

<template>
  <LayoutSectionWrapper pb-18>
    <div relative>
      <DateSwitchHeader mb-6 />

      <div
        w-full
        flex="~ col md:row"
        justify-between
        gap-6
        mt-8
      >
        <div
          max-w="full sm:base md:lg lg:2xl"
          flex-1
        >
          <TransactionList />
        </div>
        <div
          flex-1
        >
          <FInput
            v-model="transactionStore.query"
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
