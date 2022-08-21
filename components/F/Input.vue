<script lang="ts" setup>
type Props = {
  type?: string
  icon?: string
  iconPlacement?: 'left' | 'right'
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  iconPlacement: 'left',
})

const slots = useSlots()
const isSlot = (name: 'left' | 'right') => {
  const usingSlot = slots[name]
  const usingProps = props.icon && props.iconPlacement === name
  return usingProps || usingSlot
}

const paddingStyle = computed(() => {
  const { icon, iconPlacement, loading } = props
  const cn = []

  const pl = '!pl-11.5'
  const pr = '!pr-11.5'

  //   TODO: how to get slots
  console.log('slots.right :>> ', slots.right)
  if (iconPlacement === 'left' || slots.left) {
    cn.push(pl)
  } else if (iconPlacement === 'right' || slots.right) {
    cn.push(pr)
  }

  if (loading && iconPlacement !== 'right' && slots.right) {
    cn.push(pr)
  }

  return cn
})
</script>

<template>
  <div
    flex
    relative
  >
    <input
      :type="type"
      h="41px"
      w-full
      placeholder="Search"
      border="1.5 transparent focus:stone-8 rounded-sm"
      text="sm"
      flex
      items-center
      gap-4
      p="y-2.5 x-4"
      bg="stone-2"
      class="leading-5 placeholder-stone-5/60 placeholder-shown:font-normal"
      outline="none focus:none"
      :class="[paddingStyle]"
    >

    <div
      v-if="isSlot('left')"
      absolute
      text="stone-8"
      pos="top-50% left-4"
      class="-translate-y-50%"
      flex
      items-center
    >
      <slot name="left">
        <Icon :class="icon" />
      </slot>
    </div>
    <div
      v-if="loading || isSlot('right')"
      absolute
      text="stone-8"
      pos="top-50% right-4"
      class="-translate-y-50%"
      flex
      items-center
    >
      <slot v-if="loading" name="loading">
        <Icon class="i-tabler-loader-2 animate-spin" />
      </slot>
      <slot v-else name="right">
        <Icon :class="icon" />
      </slot>
    </div>
  </div>
</template>
