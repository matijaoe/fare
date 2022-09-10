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

const colorSolidBg = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-100'
    case 'green':
      return 'bg-green-100'
    case 'yellow':
      return 'bg-yellow-100'
    case 'blue':
      return 'bg-blue-100'
    case 'purple':
      return 'bg-purple-100'
    case 'pink':
      return 'bg-pink-100'
    case 'gray':
    default:
      return 'bg-gray-100'
  }
})
const colorSolidText = computed(() => {
  switch (props.color) {
    case 'red':
      return 'text-red-900'
    case 'green':
      return 'text-green-900'
    case 'yellow':
      return 'text-yellow-900'
    case 'blue':
      return 'text-blue-900'
    case 'purple':
      return 'text-purple-900'
    case 'pink':
      return 'text-pink-900'
    case 'gray':
    default:
      return 'text-gray-900'
  }
})

const colorDotText = computed(() => `text-${props.color}-400`)
const colorDotBg = computed(() => `bg-${props.color}-400`)
</script>

<template>
  <div
    v-if="type === 'solid'"
    text="xs "
    p="x-2 y-0.5"
    uppercase
    font-medium
    rounded-full
    border="2 transparent"
    class="leading-tight"
    :class="[
      colorSolidBg,
      colorSolidText,
    ]"
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
    border="2 base"
    class="leading-tight"
    flex
    gap-1
    items-center
  >
    <Icon
      v-if="icon"
      :name="icon"
      :class="[colorDotText]"
    />
    <div
      v-else
      w-2
      rounded-full
      aspect-square
      mr="0.5"
      :class="[colorDotBg]"
    />
    <slot />
  </div>
</template>

