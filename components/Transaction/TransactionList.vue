<script setup lang="ts">
import type { Transaction } from '@prisma/client'

const props = defineProps<{
  transactions: Transaction[]
  loading: boolean
}>()

const hasTransactions = computed(() => props.transactions?.length)

const transactionModal = useTransactionModal()

const sidebar = useSidebar()
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-68px)]')
</script>

<template>
  <!-- v-auto-animate -->
  <div
    bg-white
    dark:bg-zinc-9
    flex="~ col"
    divide="y-2 dashed zinc-2 dark:zinc-9"
    overflow-y-auto
    :class="[mainContentWrapperHeight]"
  >
    <template v-if="hasTransactions">
      <button
        v-for="transaction in transactions"
        :key="JSON.stringify(transaction)"
        class="hover:bg-zinc-1/40 dark:hover:bg-zinc-8/40 last:(!border-b-2 !border-b-dashed)"
        @click="transactionModal.launchEdit(transaction)"
      >
        <TransactionItem :item="transaction" />
      </button>
    </template>
    <div
      v-else
      flex
      gap-4
      min-h="244px"
      flex-center
    >
      <div
        v-if="loading"
        flex
        gap-4
        items-center
      >
        <FLoader />
        <p>Fetching transactions</p>
      </div>
      <div
        v-else
        flex
        gap-4
        items-center
      >
        <Icon name="tabler:cash-banknote-off" />
        <p>
          No transactions found
        </p>
      </div>
    </div>
  </div>
</template>

