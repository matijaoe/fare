<script setup lang="ts">
const modal = useTransactionModal()
</script>

<template>
  <div flex gap-2 z-100 v-bind="$attrs">
    <FTooltip content="Income">
      <FButton
        icon-only
        icon="tabler:arrow-down-left"
        size="xl"
        circle
        variant="success"
        class="!shadow-xl"
        @click="modal.launchNew('Income')"
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
        @click="modal.launchNew('Expense')"
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
        @click="modal.launchNew('Transfer')"
      />
    </FTooltip>
  </div>
</template>
