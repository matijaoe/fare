<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: 'light' | 'dark'
}>()

const backgroundStyle = computed(() => {
  const { filled } = props
  if (filled === 'light') {
    return 'bg-white'
  }
  if (filled === 'dark') {
    return 'bg-stone-2'
  }
  return 'bg-transparent'
})
</script>

<template>
  <article
    border="rounded-sm 2 stone-2"
    :class="[
      paddingless ? 'p-0' : 'p-4',
      backgroundStyle,
    ]"
  >
    <slot />
  </article>
</template>
