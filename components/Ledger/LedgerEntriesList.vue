<script setup>
import { useExpenses, useLedgerEntries } from '~~/composables/api/ledger'

const { data: expenses } = useExpenses()
const { data: entries } = useLedgerEntries({
  start: '2021-08-01',
  end: '2021-08-31',
})
</script>

<template>
  <div>
    <div space-y-2>
      <LedgerEntryItem v-for="entry in expenses" :key="entry.id" :item="entry" />
      <LedgerEntryItem
        v-for="entry in entries"
        :key="entry.id"
        :item="entry"
        filled
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
