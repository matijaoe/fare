<script setup lang="ts">
import type { Placement } from 'floating-vue'
import 'tippy.js/themes/material.css'

type Props = {
  content: string
  placement?: Placement
}

const props = defineProps<Props>()
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

