<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: boolean
}>()

const backgroundStyle = computed(() =>
  props.filled
    ? 'bg-stone-2 dark:bg-stone-8 border-transparent'
    : 'bg-transparent border-stone-2 dark:border-stone-8',
)
</script>

<template>
  <article
    border="rounded-sm 2"
    :class="[
      paddingless ? 'p-0' : 'p-4',
      backgroundStyle,
    ]"
  >
    <slot />
  </article>
</template>
