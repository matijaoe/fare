<script setup lang="ts">
type Props = {
  color?: string | null
  type?: 'solid' | 'dot'
  icon?: string
  rounded?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'dot',
})

const {
  colorSolidBg,
  colorSolidText,
  colorDotText,
  colorDotBg,
} = useAppColors(props.color)

const radiusClass = computed(() => {
  if (props.rounded) {
    return 'rounded-full'
  }
  return 'rounded-md'
})
const sharedClasses = 'filter-saturate-70'
</script>

<template>
  <div font="display medium" text="xs" w-fit>
    <div
      v-if="type === 'solid'"
      p="x-2 y-0.5"
      uppercase
      border="1 transparent"
      flex
      gap-1
      items-center
      transition
      justify-center
      class="leading-tight hover:border-current"
      :class="[radiusClass, sharedClasses, colorSolidBg, colorSolidText]"
    >
      <Icon
        v-if="icon"
        text="10px"
        :name="icon"
        :class="[colorSolidText]"
      />
      <slot />
    </div>
    <div
      v-else-if="type === 'dot'"
      text="zinc-7 dark:zinc-4"
      p="x-1.5 y-0.5"
      bg="dark:zinc-9"
      uppercase
      border="1 base dark:transparent"
      flex
      gap-1
      items-center
      justify-center
      class="leading-tight"
      :class="[radiusClass, sharedClasses]"
    >
      <Icon
        v-if="icon"
        text="10px"
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

