<script setup lang="ts">
import { useLedgerEntries } from '~~/composables/api/ledger'

const { data: entries } = useLedgerEntries({
  start: '2022-07-01',
  end: '2022-09-30',
})

const hasEntries = computed(() => entries.value?.length)
</script>

<template>
  <FCard
    v-if="hasEntries"
    paddingless
    white
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9"
  >
    <LedgerEntryItem
      v-for="entry in entries"
      :key="entry.id"
      :item="entry"
    />
  </FCard>
</template>

