<script lang="ts" setup>
const props = withDefaults(defineProps<{
  variant: 'lighter' | 'default' | 'darker'
}>(), {
  variant: 'default',
})

const styles = computed(() => {
  switch (props.variant) {
    case 'lighter':
      return 'bg-stone-100'
    case 'darker':
      return 'bg-stone-300'
    case 'default':
    default:
      return 'bg-stone-200'
  }
})
</script>

<template>
  <div
    class="max-w-sm animate-pulse rounded-md dark:bg-stone-7"
    :class="styles"
  />
</template>
