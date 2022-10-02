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
  keepStyleOnLoad?: boolean
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
      return 'bg-zinc-9 text-zinc-2 hover:not-disabled:(bg-zinc-8) focus-visible:not-disabled:(bg-zinc-8) dark:(bg-zinc-3 text-zinc-8 hover:not-disabled:(bg-zinc-2) focus-visible:not-disabled:(bg-zinc-1))'
    case 'secondary':
      return 'bg-zinc-2 text-zinc-9 hover:not-disabled:(bg-zinc-3/75) focus-visible:not-disabled:(bg-zinc-3/75) dark:(bg-zinc-8 text-zinc-2 hover:not-disabled:(bg-zinc-7) focus-visible:not-disabled:(bg-zinc-7))'
    case 'subtle':
      return 'bg-transparent text-zinc-9 hover:not-disabled:(bg-zinc-2/50) focus-visible:not-disabled:(bg-zinc-2/50) dark:(text-zinc-2 hover:not-disabled:(bg-zinc-8) focus-visible:not-disabled:(bg-zinc-8))'
    case 'outline':
      return 'bg-transparent text-zinc-9 !border-zinc-9 hover:not-disabled:(bg-zinc-2/50) focus-visible:not-disabled:(bg-zinc-1) dark:(text-zinc-2 !border-zinc-7 hover:not-disabled:(bg-zinc-8 text-zinc-2) focus-visible:not-disabled:(bg-zinc-8 text-zinc-2))'
    case 'danger':
      return 'bg-red-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-red-4/95) dark:(bg-red-5 filter-saturate-80 hover:not-disabled:(bg-red-5 filter-saturate-95) focus-visible:not-disabled:(bg-red-4))'
    case 'warning':
      return 'bg-amber-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-amber-4/95) dark:(bg-amber-5 filter-saturate-80 hover:not-disabled:(bg-amber-5 filter-saturate-95) focus-visible:not-disabled:(bg-amber-5))'
    case 'success':
      return 'bg-green-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-green-4/95) dark:(bg-green-5 filter-saturate-80 hover:not-disabled:(bg-green-5 filter-saturate-95) focus-visible:not-disabled:(bg-green-4))'
    case 'info':
      return 'bg-sky-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-sky-4/95) dark:(bg-sky-5 filter-saturate-80 hover:not-disabled:(bg-sky-5 filter-saturate-95) focus-visible:not-disabled:(bg-sky-4))'
    case 'indigo':
      return 'bg-indigo-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-indigo-4/95) dark:(bg-indigo-5 filter-saturate-80 hover:not-disabled:(bg-indigo-5 filter-saturate-95) focus-visible:not-disabled:(bg-indigo-4))'
    case 'teal':
      return 'bg-teal-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-teal-4/95) dark:(bg-teal-5 filter-saturate-80 hover:not-disabled:(bg-teal-5 filter-saturate-95) focus-visible:not-disabled:(bg-teal-4))'
    case 'lime':
      return 'bg-lime-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-lime-4/95) dark:(bg-lime-5 filter-saturate-80 hover:not-disabled:(bg-lime-5 filter-saturate-95) focus-visible:not-disabled:(bg-lime-4))'
    case 'rose':
      return 'bg-rose-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-rose-4/95) dark:(bg-rose-5 filter-saturate-80 hover:not-disabled:(bg-rose-5 filter-saturate-95) focus-visible:not-disabled:(bg-rose-4))'
    case 'zinc':
      return 'bg-zinc-4 text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-zinc-4/95) dark:(bg-zinc-5 filter-saturate-80 hover:not-disabled:(bg-zinc-5 filter-saturate-95) focus-visible:not-disabled:(bg-zinc-4))'
    case 'custom':
      return 'bg-[#5D8D7B] text-zinc-9 !border-zinc-9/50 hover:not-disabled:(filter-saturate-110) focus-visible:not-disabled:(bg-zinc-4/95) dark:(bg-zinc-5 filter-saturate-80 hover:not-disabled:(bg-zinc-5 filter-saturate-95) focus-visible:not-disabled:(bg-zinc-4))'
  }
})

const sizeStyle = computed(() => {
  const { iconOnly: icon, size } = props
  switch (size) {
    case 'sm':
      return `${icon ? 'p-1.3' : 'py-1.25 px-2.5'} text-xs gap-1`
    case 'md':
      return `${icon ? 'p-2.5' : 'py-2.25 px-4'} text-sm gap-2`
    case 'lg':
      return `${icon ? 'p-3.45' : 'py-2.75 px-7'} text-base gap-3`
    case 'xl':
      return `${icon ? 'p-4' : 'py-3.25 px-8'} text-2xl gap-3`
  }
})

const widthStyle = computed(() => props.block ? 'w-full' : 'w-auto')
const radiusStyle = computed(() => props.circle ? 'rounded-full' : 'rounded-md')

const disabledStyle = computed(() => ({
  'opacity-45 cursor-not-allowed': props.disabled && !props.loading,
  'opacity-75 cursor-wait': props.loading && !props.keepStyleOnLoad,
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
    border="2 transparent"
    flex-center
    text="center"
    font="medium"
    :disabled="loading || disabled"
    :class="[variantStyle, sizeStyle, widthStyle, radiusStyle, disabledStyle, theme.textCasing]"
    outline="none"
  >
    <slot v-if="loading" name="loading">
      <Icon name="tabler:loader-2" class="animate-spin" />
    </slot>
    <slot v-else-if="isSlot('left')" name="left">
      <Icon :name="icon" />
    </slot>
    <slot v-if="$slots.icon || (icon && iconOnly) && !loading" name="icon">
      <Icon :name="icon" />
    </slot>
    <slot v-else>
      {{ label }}
    </slot>
    <slot v-if="isSlot('right')" name="right">
      <Icon :name="icon" />
    </slot>
  </button>
</template>

