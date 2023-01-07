<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'md' | 'lg'
  minimal?: boolean
  darker?: boolean
}>(), {
  size: 'md',
})

const sizeStyle = computed(() => {
  const { size } = props
  switch (size) {
    case 'md':
      return {
        text: 'text-2xl',
        icon: 'text-xl',
      }
    case 'lg':
    default:
      return {
        text: 'text-3xl',
        icon: 'text-2xl',
      }
  }
})
</script>

<template>
  <div
    flex="~ gap-1" items-center
    font="sans black"
    :class="[darker ? 'text-zinc-9 dark:text-zinc-3' : 'text-zinc-7 dark:text-zinc-3', sizeStyle.text]"
  >
    <Icon
      name="fluent-emoji-flat:hand-with-index-finger-and-thumb-crossed-medium-light"
      :class="[sizeStyle.icon]"
    />
    <span v-if="!minimal">FARE</span>
  </div>
</template>
