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
  bg1,
  color9,
  color4,
  bg4,
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
      border="1 transparent"
      flex gap-1 items-center justify-center
      transition uppercase
      class="leading-tight hover:border-current"
      :class="[radiusClass, sharedClasses, bg1, color9]"
    >
      <Icon
        v-if="icon"
        text="10px"
        :name="icon"
        :class="[color9]"
      />
      <slot />
    </div>
    <div
      v-else-if="type === 'dot'"
      text="zinc-7 dark:zinc-4"
      p="x-1.5 y-0.5"
      bg="dark:zinc-8"
      border="1 base dark:transparent"
      flex gap-1 items-center justify-center
      uppercase
      class="leading-tight hover:border-current"
      :class="[radiusClass, sharedClasses]"
    >
      <Icon
        v-if="icon"
        text="10px"
        :name="icon"
        :class="[color4]"
      />
      <div
        v-else w-2 rounded-full aspect-square mr="0.5" :class="[bg4]"
      />
      <slot />
    </div>
  </div>
</template>

