<script setup lang="ts">
import type { Placement } from 'floating-vue'

defineProps<{
  content: string
  placement?: Placement
}>()
</script>

<template>
  <div
    ref="target"
    v-tooltip="{
      delay: 100,
      content,
      theme: 'info-tooltip',
      placement,
    }"
  >
    <slot />
  </div>
</template>
