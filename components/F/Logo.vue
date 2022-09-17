<script lang="ts" setup>
const props = withDefaults(defineProps<{
  size?: 'md' | 'lg'
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
    font-black
    flex
    items-center
    font="mono"
    class="color-base-lighter"
    :class="[sizeStyle.text]"
  >
    FI
    <Icon
      name="ph:lightning-duotone"
      :class="[sizeStyle.icon]"
    />
    RE
  </div>
</template>

