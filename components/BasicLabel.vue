<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'xs' | 'sm' | 'default'
}>(), {
  size: 'default',
})

const textSize = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'text-10px'
    case 'sm':
      return 'text-xs'
    case 'default':
      return 'text-sm'
  }
})
</script>

<template>
  <p
    uppercase
    font="sans medium"
    text="zinc-4 dark:zinc-5"
    class="leading-tight"
    :class="[textSize]"
  >
    <slot />
  </p>
</template>

