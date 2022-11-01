<script setup lang="ts">
import type { Placement } from 'floating-vue'

defineProps<{
  content: string
  placement?: Placement
}>()
</script>

<template>
  <!-- TODO: fix tippy for build -->
  <div
    ref="target"
    v-tooltip="{
      delay: 20,
      content,
      theme: 'info-tooltip',
      placement,
    }"
  >
    <slot />
  </div>
</template>

