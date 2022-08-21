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
    case 'primary':
      return 'bg-stone-9 text-stone-1 hover:not-disabled:(bg-stone-8)'
    case 'secondary':
      return 'bg-stone-2 text-stone-9 hover:not-disabled:(bg-stone-3/75)'
    case 'subtle':
      return 'bg-transparent text-stone-9 hover:not-disabled:(bg-stone-2/75)'
    case 'outline':
      return 'bg-transparent text-stone-9 !border-current hover:not-disabled:(bg-stone-2)'
    case 'danger':
      return 'bg-red-5/85 text-stone-9 !border-current hover:not-disabled:(bg-red-5/95)'
    case 'warning':
      return 'bg-amber-5/85 text-stone-9 !border-current hover:not-disabled:(bg-amber-5/95)'
    case 'success':
      return 'bg-green-5/85 text-stone-9 !border-current hover:not-disabled:(bg-green-5/95)'
  }
})

const sizeStyle = computed(() => {
  const { iconOnly: icon, size } = props
  switch (size) {
    case 'sm':
      return `${icon ? 'p-1.3' : 'py-1 px-2.5'} text-xs gap-1`
    case 'md':
      return `${icon ? 'p-2' : 'py-1.5 px-4'} text-sm gap-2`
    case 'lg':
      return `${icon ? 'p-3.2' : 'py-2.5 px-7'} text-base gap-3`
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
  >
    <slot v-if="loading" name="loading">
      <Icon class="i-tabler-loader-2 animate-spin" />
    </slot>
    <slot v-else-if="isSlot('left')" name="left">
      <Icon :class="icon" />
    </slot>
    <slot v-if="$slots.icon || (icon && iconOnly) && !loading" name="icon">
      <Icon :class="icon" />
    </slot>
    <slot v-else>
      {{ label }}
    </slot>
    <slot v-if="isSlot('right')" name="right">
      <Icon :class="icon" />
    </slot>
  </button>
</template>

