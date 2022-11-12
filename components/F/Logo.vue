<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'md' | 'lg'
  minimal?: boolean
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
    flex
    gap="0.5"
    items-center
    font="sans black"
    class="color-base-lighter"
    :class="[sizeStyle.text]"
  >
    <Icon
      name="ph:campfire-duotone"
      :class="[sizeStyle.icon]"
    />
    <span v-if="!minimal">IRE</span>
  </div>
</template>

