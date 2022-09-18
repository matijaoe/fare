<script setup lang="ts">
import { useLedgerEntries } from '~~/composables/api/ledger'

defineProps<{
  redesign?: boolean
}>()

const { data: entries } = useLedgerEntries({
  start: '2022-07-01',
  end: '2022-09-30',
})

const hasEntries = computed(() => entries.value?.length)
</script>

<template>
  <FCard
    v-if="redesign && hasEntries"
    paddingless
    white
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9 dark:dashed"
  >
    <LedgerEntryItemAlt
      v-for="entry in entries"
      :key="entry.id"
      :item="entry"
    />
  </FCard>
  <div
    v-else
    flex
    flex-col
    gap-6
  >
    <LedgerEntryItem v-for="entry in entries" :key="entry.id" :item="entry" />
  </div>
</template>

