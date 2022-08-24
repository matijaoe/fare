<script lang="ts" setup>
const props = defineProps<{
  paddingless?: boolean
  filled?: boolean
}>()

const backgroundStyle = computed(() =>
  props.filled
    ? 'bg-stone-2'
    : 'bg-transparent',
)
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
