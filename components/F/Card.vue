<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: boolean
  white?: boolean
}>()

const backgroundStyle = computed(() =>
  props.filled
    ? 'bg-zinc-2 dark:bg-zinc-8 border-transparent'
    : 'bg-transparent border-zinc-2 dark:border-zinc-8',
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
