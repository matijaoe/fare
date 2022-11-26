<script lang="ts" setup>
const props = defineProps<{
  type: 'error' | 'warning' | 'info'
}>()

const styleClass = computed(() => ({
  'bg-red-1 text-red-7': props.type === 'error',
  'bg-yellow-1 text-yellow-7': props.type === 'warning',
  'bg-zinc-1 text-zinc-7': props.type === 'info',
}))

const icon = computed(() => ({
  error: 'tabler:alert-triangle',
  warning: 'tabler:alert-triangle',
  info: 'tabler:info-circle',
}[props.type]))
</script>

<template>
  <div
    p-7
    font-sans
    text-base
    font-medium
    rounded-md
    filter-saturate-80
    :class="[styleClass]"
  >
    <div flex items-center gap-4>
      <Icon :name="icon" text-2xl />
      <slot />
    </div>
  </div>
</template>
