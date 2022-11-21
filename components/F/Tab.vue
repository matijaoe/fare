<script lang="ts" setup>
import { Tab } from '@headlessui/vue'
</script>

<template>
  <Tab
    v-slot="{ selected }"
    as="template"
  >
    <FButton size="sm" :variant="selected ? 'primary' : 'secondary'">
      <slot :selected="{ selected }" />
    </FButton>
  </Tab>
</template>
