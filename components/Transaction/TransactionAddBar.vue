<script setup lang="ts">
const modal = useTransactionModal()
</script>

<template>
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
        class="!shadow-xl"
        @click="modal.launch('Income')"
      />
    </FTooltip>
    <FTooltip content="Expense">
      <FButton
        icon-only
        icon="tabler:arrow-up-right"
        size="xl"
        circle
        variant="primary"
        class="!shadow-xl"
        @click="modal.launch('Expense')"
      />
    </FTooltip>
    <FTooltip content="Transfer">
      <FButton
        icon-only
        icon="tabler:arrows-exchange"
        size="xl"
        circle
        variant="indigo"
        class="!shadow-xl"
        @click="modal.launch('Transfer')"
      />
    </FTooltip>
  </div>
</template>
