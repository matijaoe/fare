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
  <Icon
    v-if="minimal"
    name="ph:lightning-duotone"
    :class="[sizeStyle.icon]"
  />
  <div
    v-else
    flex
    items-center
    font="sans black"
    class="color-base-lighter"
    :class="[sizeStyle.text]"
  >
    FIN
    <Icon
      name="ph:fire-duotone"
      :class="[sizeStyle.icon]"
    />
    IND
  </div>
</template>

