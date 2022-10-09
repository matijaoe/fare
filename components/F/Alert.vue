<script lang="ts" setup>
const props = defineProps<{
  type: 'error' | 'warning' | 'info'
}>()

const styleClass = computed(() => ({
  'bg-red-1 text-red-7': props.type === 'error',
  'bg-yellow-1 text-yellow-7': props.type === 'warning',
  'bg-zinc-1 text-zinc-7': props.type === 'info',
}))
</script>

<template>
  <div
    p-7
    font-sans
    text-lg
    rounded-md
    text-center
    filter-saturate-80
    :class="[styleClass]"
  >
    <slot />
  </div>
</template>
