<script setup lang="ts">
type Props = {
  label?: string
  variant?: 'primary' | 'secondary' | 'subtle' | 'outline' | 'danger' | 'warning' | 'success'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  block?: boolean
  icon?: string
  iconPlacement?: 'left' | 'right'
  loading?: boolean
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  iconPlacement: 'left',
})

const variantStyle = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-stone-9 text-stone-1 hover:not-disabled:(bg-stone-8)'
    case 'secondary':
      return 'bg-stone-2 text-stone-9 hover:not-disabled:(bg-stone-3/75)'
    case 'subtle':
      return 'bg-transparent text-stone-9 hover:not-disabled:(bg-stone-2/75)'
    case 'outline':
      return 'bg-transparent text-stone-9 !border-current hover:not-disabled:(bg-stone-2)'
    case 'danger':
      return 'bg-red-5/80 text-stone-9 !border-current hover:not-disabled:(bg-red-5/90)'
    case 'warning':
      return 'bg-amber-5/80 text-stone-9 !border-current hover:not-disabled:(bg-amber-5/90)'
    case 'success':
      return 'bg-green-5/80 text-stone-9 !border-current hover:not-disabled:(bg-green-5/90)'
  }
})

const sizeStyle = computed(() => {
  switch (props.size) {
    case 'xs':
      return 'py-0.4 px-1 text-[0.6rem] gap-1 font-bold'
    case 'sm':
      return 'py-1 px-2.5 text-xs gap-1 font-bold'
    case 'md':
      return 'py-1.5 px-4 text-sm gap-2 font-bold'
    case 'lg':
      return 'py-2.5 px-7 text-base gap-3 font-bold'
  }
})

const widthStyle = computed(() => props.block ? 'w-full' : 'w-auto')
const disabledStyle = computed(() => ({
  'opacity-45': props.disabled && !props.loading,
  'opacity-75': props.loading,
}))
</script>

<template>
  <button
    border="1.5 transparent"
    class="rounded-sm  uppercase disabled:(cursor-not-allowed)"
    :class="[widthStyle, variantStyle, sizeStyle, disabledStyle]"
    flex
    justify-center
    items-center
    text="center"
    :disabled="loading || disabled"
  >
    <slot v-if="loading" name="loading">
      <Icon class="i-tabler-loader-2 animate-spin" />
    </slot>
    <slot v-else-if="(icon && iconPlacement === 'left') || $slots.left" name="left">
      <Icon :class="icon" />
    </slot>
    <slot>{{ label }}</slot>
    <slot v-if="(icon && iconPlacement === 'right') || $slots.right" name="right">
      <Icon :class="icon" />
    </slot>
  </button>
</template>

<style lang="scss" scoped>

</style>
