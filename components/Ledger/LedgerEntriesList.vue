<script setup>
import { useExpenses, useLedgerEntries } from '~~/composables/api/ledger'

const { data: expenses } = useExpenses()
const { data: entries } = useLedgerEntries({
  start: '2021-08-01',
  end: '2021-08-31',
})
</script>

<template>
  <div
    flex
    flex-col
    gap-8
  >
    <LedgerEntryItem v-for="entry in expenses" :key="entry.id" :item="entry" />
  </div>
</template>

<style lang="scss" scoped>

</style>
