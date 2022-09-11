<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: boolean
  white?: boolean
}>()

const backgroundStyle = computed(() => {
  if (props.white) {
    return 'bg-white dark:(bg-zinc-8 border-zinc-9)'
  }
  return props.filled
    ? 'bg-zinc-2 dark:bg-zinc-8 border-transparent'
    : 'bg-transparent border-zinc-2 dark:border-zinc-8'
})
</script>

<template>
  <article
    border="rounded-lg 1"
    class="transition-shadow"
    :class="[
      paddingless ? 'p-0' : 'p-5',
      backgroundStyle,
    ]"
  >
    <slot />
  </article>
</template>
