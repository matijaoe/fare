<script setup lang="ts">
import type { Transaction } from '@prisma/client'

const props = defineProps<{
  transactions: Transaction[]
  loading: boolean
}>()

const hasTransactions = computed(() => props.transactions?.length)

const transactionModal = useTransactionModal()

const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-60px-44px)]')

const items = computed({
  get: () => props.transactions,
  set: (value: Transaction[]) => value,
})
</script>

<template>
  <div
    bg-white dark:bg-zinc-9
    overflow-y-auto
    :class="[mainContentWrapperHeight]"
  >
    <div
      flex="~ col"
      divide="y-2 dashed zinc-2 dark:zinc-8"
    >
      <template v-if="hasTransactions">
        <button
          v-for="item in items"
          :key="JSON.stringify(item)"
          class="hover:bg-zinc-1/40 dark:hover:bg-zinc-8/40 last:(!border-b-2 !border-b-dashed border-zinc-2 dark:border-zinc-8)"
          @click="transactionModal.launchEdit(item)"
        >
          <TransactionItem :item="item" />
        </button>
      </template>

      <div v-else flex-center gap-4 min-h="244px">
        <div v-if="loading" flex gap-4 items-center>
          <FLoader />
          <p>Fetching transactions</p>
        </div>
        <div
          v-else flex gap-4 items-center
        >
          <Icon name="tabler:cash-banknote-off" />
          <p>No transactions found</p>
        </div>
      </div>
    </div>
  </div>
</template>
