<script setup lang="ts">
import { set } from '@vueuse/core'

const modalOpen = ref(false)
const openModal = () => set(modalOpen, true)

const modalConfig = computed(() => ({
  title: 'Add new entry',
  description: 'Add a new entry to your ledger',
  closable: true,
}))
</script>

<template>
  <ModalBase v-model="modalOpen" v-bind="modalConfig" />
  <div
    flex
    gap-2
    v-bind="$attrs"
  >
    <FTooltip content="Income">
      <FButton
        icon-only
        icon="tabler:arrow-down-left"
        size="xl"
        circle
        variant="success"
        class="!shadow-xl !filter-grayscale-60 !hover:filter-grayscale-0"
        @click="openModal"
      />
    </FTooltip>
    <FTooltip content="Expense">
      <FButton
        icon-only
        icon="tabler:arrow-up-right"
        size="xl"
        circle
        variant="teal"
        class="!shadow-xl !filter-grayscale-40 !hover:filter-grayscale-0"
        @click="openModal"
      />
    </FTooltip>
    <FTooltip content="Transfer">
      <FButton
        icon-only
        icon="tabler:arrows-exchange"
        size="xl"
        circle
        variant="info"
        class="!shadow-xl !filter-grayscale-80 !hover:filter-grayscale-0"
        @click="openModal"
      />
    </FTooltip>
  </div>
</template>
