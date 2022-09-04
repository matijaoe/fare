<script setup lang="ts">
defineProps<{
  icon?: string
}>()
</script>

<template>
  <i
    :class="[icon]"
    aria-hidden="true"
  />
</template>
