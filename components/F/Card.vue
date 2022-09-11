<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: boolean
  white?: boolean
}>()

const backgroundStyle = computed(() => {
  if (props.white) {
    return 'bg-white dark:(bg-zinc-8 border-zinc-9) shadow-[7px_8px_0_#E4E4E7] shadow-[7px_8px_0_#E4E4E7] dark:(shadow-[7px_8px_0_#27272a])'
  }
  return props.filled
    ? 'bg-zinc-2 dark:bg-zinc-8 border-zinc-3 dark:border-zinc-9 shadow-[7px_8px_0_#d4d4d8] dark:(shadow-[7px_8px_0_#27272a])'
    : 'bg-transparent border-zinc-2 dark:border-zinc-8 shadow-[7px_8px_0_#E4E4E7] dark:(shadow-[7px_8px_0_#27272a])'
})
</script>

<template>
  <article
    border="rounded-md 2"
    class="transition-shadow"
    :class="[
      paddingless ? 'p-0' : 'p-5',
      backgroundStyle,
    ]"
  >
    <slot />
  </article>
</template>
