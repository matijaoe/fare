<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: boolean
}>()

const backgroundStyle = computed(() =>
  props.filled
    ? 'bg-stone-2 dark:bg-stone-8'
    : 'bg-transparent',
)
</script>

<template>
  <article
    border="rounded-sm 2 base"
    :class="[
      paddingless ? 'p-0' : 'p-4',
      backgroundStyle,
    ]"
  >
    <slot />
  </article>
</template>
