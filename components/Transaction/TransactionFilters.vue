<script lang="ts" setup>
const transactionStore = useTransactionsStore()
</script>

<template>
  <div>
    <FInput
      v-model="transactionStore.searchQuery"
      type="search"
      placeholder="Search"
      icon="tabler:search"
    />
  </div>
</template>
