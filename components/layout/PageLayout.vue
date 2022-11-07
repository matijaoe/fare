<script lang="ts" setup>
defineProps<{
  range: boolean
}>()
</script>

<template>
  <div space-y-8>
    <LazyDateSwitchHeader v-if="range" />

    <div
      space-y-10
      mx-auto
    >
      <slot />
    </div>
  </div>
</template>
