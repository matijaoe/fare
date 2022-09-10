<script setup lang="ts">
type Props = {
  color?: string
  type?: 'solid' | 'dot'
  icon?: string
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'dot',
})

const colorSolidBg = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-100'
    case 'orange':
      return 'bg-orange-100'
    case 'amber':
      return 'bg-amber-100'
    case 'yellow':
      return 'bg-yellow-100'
    case 'lime':
      return 'bg-lime-100'
    case 'green':
      return 'bg-green-100'
    case 'emerald':
      return 'bg-emerald-100'
    case 'teal':
      return 'bg-teal-100'
    case 'cyan':
      return 'bg-cyan-100'
    case 'sky':
      return 'bg-sky-100'
    case 'blue':
      return 'bg-blue-100'
    case 'indigo':
      return 'bg-indigo-100'
    case 'violet':
      return 'bg-violet-100'
    case 'purple':
      return 'bg-purple-100'
    case 'fuchsia':
      return 'bg-fuchsia-100'
    case 'pink':
      return 'bg-pink-100'
    case 'rose':
      return 'bg-rose-100'
    case 'gray':
      return 'bg-gray-100'
    default:
      return 'bg-zinc-100'
  }
})
const colorSolidText = computed(() => {
  switch (props.color) {
    case 'red':
      return 'text-red-900'
    case 'orange':
      return 'text-orange-900'
    case 'amber':
      return 'text-amber-900'
    case 'yellow':
      return 'text-yellow-900'
    case 'lime':
      return 'text-lime-900'
    case 'green':
      return 'text-green-900'
    case 'emerald':
      return 'text-emerald-900'
    case 'teal':
      return 'text-teal-900'
    case 'cyan':
      return 'text-cyan-900'
    case 'sky':
      return 'text-sky-900'
    case 'blue':
      return 'text-blue-900'
    case 'indigo':
      return 'text-indigo-900'
    case 'violet':
      return 'text-violet-900'
    case 'purple':
      return 'text-purple-900'
    case 'fuchsia':
      return 'text-fuchsia-900'
    case 'pink':
      return 'text-pink-900'
    case 'rose':
      return 'text-rose-900'
    case 'gray':
      return 'text-gray-900'
    default:
      return 'text-zinc-900'
  }
})

const colorDotText = computed(() => {
  switch (props.color) {
    case 'red':
      return 'text-red-400'
    case 'orange':
      return 'text-orange-400'
    case 'amber':
      return 'text-amber-400'
    case 'yellow':
      return 'text-yellow-400'
    case 'lime':
      return 'text-lime-400'
    case 'green':
      return 'text-green-400'
    case 'emerald':
      return 'text-emerald-400'
    case 'teal':
      return 'text-teal-400'
    case 'cyan':
      return 'text-cyan-400'
    case 'sky':
      return 'text-sky-400'
    case 'blue':
      return 'text-blue-400'
    case 'indigo':
      return 'text-indigo-400'
    case 'violet':
      return 'text-violet-400'
    case 'purple':
      return 'text-purple-400'
    case 'fuchsia':
      return 'text-fuchsia-400'
    case 'pink':
      return 'text-pink-400'
    case 'rose':
      return 'text-rose-400'
    case 'gray':
      return 'text-gray-400'
    default:
      return 'text-zinc-400'
  }
})
const colorDotBg = computed(() => {
  switch (props.color) {
    case 'red':
      return 'bg-red-400'
    case 'orange':
      return 'bg-orange-400'
    case 'amber':
      return 'bg-amber-400'
    case 'yellow':
      return 'bg-yellow-400'
    case 'lime':
      return 'bg-lime-400'
    case 'green':
      return 'bg-green-400'
    case 'emerald':
      return 'bg-emerald-400'
    case 'teal':
      return 'bg-teal-400'
    case 'cyan':
      return 'bg-cyan-400'
    case 'sky':
      return 'bg-sky-400'
    case 'blue':
      return 'bg-blue-400'
    case 'indigo':
      return 'bg-indigo-400'
    case 'violet':
      return 'bg-violet-400'
    case 'purple':
      return 'bg-purple-400'
    case 'fuchsia':
      return 'bg-fuchsia-400'
    case 'pink':
      return 'bg-pink-400'
    case 'rose':
      return 'bg-rose-400'
    case 'gray':
      return 'bg-gray-400'
    default:
      return 'bg-zinc-400'
  }
})
const radiusClass = computed(() => {
  if (props.rounded) {
    return 'rounded-full'
  }
  return 'rounded-sm'
})
const sharedClasses = 'filter-saturate-70'
</script>

<template>
  <div>
    <div
      v-if="type === 'solid'"
      text="11px"
      p="x-2 y-0.5"
      uppercase
      font-bold
      border="2 transparent"
      flex
      gap-1
      items-center
      class="leading-tight"
      :class="[radiusClass, sharedClasses, colorSolidBg, colorSolidText]"
    >
      <Icon
        v-if="icon"
        :name="icon"
        :class="[colorDotText]"
      />
      <slot />
    </div>
    <div
      v-else-if="type === 'dot'"
      text="11px zinc-7 dark:zinc-4"
      bg="base"
      p="x-1.5 y-0.5"
      uppercase
      font-medium
      border="2 base"
      flex
      gap-1
      items-center
      class="leading-tight"
      :class="[radiusClass, sharedClasses]"
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
  </div>
</template>

