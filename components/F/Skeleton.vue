<script lang="ts" setup>
const props = withDefaults(defineProps<{
  variant?: 'lighter' | 'default' | 'darker'
}>(), {
  variant: 'default',
})

const styles = computed(() => {
  switch (props.variant) {
    case 'lighter':
      return 'bg-zinc-100'
    case 'darker':
      return 'bg-zinc-300'
    case 'default':
    default:
      return 'bg-zinc-200/60'
  }
})
</script>

<template>
  <div
    class="max-w-sm animate-pulse rounded-md dark:bg-zinc-7"
    :class="styles"
  />
</template>
