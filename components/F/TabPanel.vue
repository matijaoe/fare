<script lang="ts" setup>
import { TabPanel } from '@headlessui/vue'

defineProps<{
  title?: string
  desc?: string
  icon?: string
}>()
</script>

<template>
  <TabPanel v-slot="{ selected }">
    <div v-if="$slots.title || title || desc" mb-4>
      <slot name="title">
        <h1
          flex items-center gap-3
          text-2xl font="sans semibold" uppercase
        >
          <Icon v-if="icon" :name="icon" />
          {{ title }}
        </h1>
        <p
          v-if="desc"
          mt="1"
          text="sm zinc-4 dark:zinc-5"
        >
          {{ desc }}
        </p>
      </slot>
    </div>

    <div space-y-5>
      <slot :selected="{ selected }" />
    </div>
  </TabPanel>
</template>
