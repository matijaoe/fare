<script setup lang="ts">
type Props = {
  color?: string
  type?: 'solid' | 'dot'
  icon?: string
}

const props = withDefaults(defineProps<Props>(), {
  color: 'gray',
  type: 'dot',
})
</script>

<template>
  <div
    v-if="type === 'solid'"
    text="xs violet-900"
    p="x-2 y-0.5"
    uppercase
    font-medium
    rounded-full
    border="1.5 base"
    bg="violet-100"
    class="leading-tight"
  >
    <slot />
  </div>
  <div
    v-else-if="type === 'dot'"
    text="xs zinc-7 dark:zinc-4"
    p="x-1.25 y-0.5"
    uppercase
    font-medium
    rounded-xs
    border="1.5 base"
    class="leading-tight"
    flex
    gap-1
    items-center
  >
    <Icon
      v-if="icon"
      :name="icon"
      text="violet-400"
    />
    <div
      v-else
      w-2
      rounded-full
      aspect-square
      bg="violet-400"
      mr="0.5"
    />
    <slot />
  </div>
</template>

