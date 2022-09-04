<script setup lang="ts">
import { useTheme } from '~/store/theme'
import type { ButtonSize, ButtonVariant } from '~/models/theme'

type Props = {
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  icon?: string
  iconPlacement?: 'left' | 'right'
  block?: boolean
  loading?: boolean
  disabled?: boolean
  iconOnly?: boolean
  circle?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  iconPlacement: 'left',
  radius: 'square',
})

const theme = useTheme()

const variantStyle = computed(() => {
  switch (props.variant) {
    // TODO: focus states with outlines
    case 'primary':
      return 'bg-stone-9 text-stone-2 hover:not-disabled:(bg-stone-8) focus-visible:not-disabled:(bg-stone-8) dark:(bg-stone-2 text-stone-8 hover:not-disabled:(bg-stone-1) focus-visible:not-disabled:(bg-stone-1))'
    case 'secondary':
      return 'bg-stone-2 text-stone-9 hover:not-disabled:(bg-stone-3/75) focus-visible:not-disabled:(bg-stone-3/75) dark:(bg-stone-8 text-stone-2 hover:not-disabled:(bg-stone-7) focus-visible:not-disabled:(bg-stone-7))'
    case 'subtle':
      return 'bg-transparent text-stone-9 hover:not-disabled:(bg-stone-2/75) focus-visible:not-disabled:(bg-stone-2/75) dark:(text-stone-2 hover:not-disabled:(bg-stone-8) focus-visible:not-disabled:(bg-stone-8))'
    case 'outline':
      return 'bg-transparent text-stone-9 !border-current hover:not-disabled:(bg-stone-2) focus-visible:not-disabled:(bg-stone-2) dark:(text-stone-2 !border-stone-7 hover:not-disabled:(bg-stone-8 text-stone-2) focus-visible:not-disabled:(bg-stone-8 text-stone-2))'
    case 'danger':
      return 'bg-red-4 text-stone-9 !border-current hover:not-disabled:(bg-red-4/90) focus-visible:not-disabled:(bg-red-4/95) dark:(bg-red-5 !border-transparent hover:not-disabled:(bg-red-4) focus-visible:not-disabled:(bg-red-4))'
    case 'warning':
      return 'bg-amber-4 text-stone-9 !border-current hover:not-disabled:(bg-amber-4/90) focus-visible:not-disabled:(bg-amber-4/95) dark:(bg-amber-5 !border-transparent hover:not-disabled:(bg-amber-4) focus-visible:not-disabled:(bg-amber-5))'
    case 'success':
      return 'bg-green-4 text-stone-9 !border-current hover:not-disabled:(bg-green-4/9) focus-visible:not-disabled:(bg-green-4/95) dark:(bg-green-5 !border-transparent hover:not-disabled:(bg-green-4) focus-visible:not-disabled:(bg-green-4))'
  }
})

const sizeStyle = computed(() => {
  const { iconOnly: icon, size } = props
  switch (size) {
    case 'sm':
      return `${icon ? 'p-1.3' : 'py-1 px-2.5'} text-xs gap-1`
    case 'md':
      return `${icon ? 'p-2.5' : 'py-2.25 px-4'} text-sm gap-2`
    case 'lg':
      return `${icon ? 'p-3.45' : 'py-2.75 px-7'} text-base gap-3`
  }
})

const widthStyle = computed(() => props.block ? 'w-full' : 'w-auto')
const radiusStyle = computed(() => props.circle ? 'rounded-full' : 'rounded-sm')

const disabledStyle = computed(() => ({
  'opacity-45 cursor-not-allowed': props.disabled && !props.loading,
  'opacity-75 cursor-wait': props.loading,
}))

const slots = useSlots()

const isSlot = (name: 'left' | 'right') => {
  const iconOnly = (props.icon && props.iconOnly) || slots.icon
  const usingSlot = slots[name]
  const usingProps = props.icon && props.iconPlacement === name
  return !iconOnly && (usingProps || usingSlot)
}
</script>

<template>
  <button
    border="1.5 transparent"
    flex
    justify-center
    items-center
    text="center"
    font="medium"
    :disabled="loading || disabled"
    :class="[variantStyle, sizeStyle, widthStyle, radiusStyle, disabledStyle, theme.textCasing]"
    outline="none"
  >
    <slot v-if="loading" name="loading">
      <Icon icon="i-tabler-loader-2" class="animate-spin" />
    </slot>
    <slot v-else-if="isSlot('left')" name="left">
      <Icon :icon="icon" />
    </slot>
    <slot v-if="$slots.icon || (icon && iconOnly) && !loading" name="icon">
      <Icon :icon="icon" />
    </slot>
    <slot v-else>
      {{ label }}
    </slot>
    <slot v-if="isSlot('right')" name="right">
      <Icon :icon="icon" />
    </slot>
  </button>
</template>

