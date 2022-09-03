<script lang="ts" setup>
type Props = {
  modelValue?: string
  type?: string
  icon?: string
  iconPlacement?: 'left' | 'right'
  loading?: boolean
  placeholder?: string
  invalid?: boolean
  positive?: boolean
  disabled?: boolean
  label?: string
  hint?: string
  error?: string
}

type Emits = {
  (e: 'input', value?: string): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'update:modelValue', value?: string): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  iconPlacement: 'left',
})

const emit = defineEmits<Emits>()

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

  if ((icon && iconPlacement === 'left') || slots.left) {
    cn.push(pl)
  } else if ((icon && iconPlacement === 'right') || slots.right) {
    cn.push(pr)
  }
  if (loading && !(iconPlacement !== 'right' && slots.right)) {
    cn.push(pr)
  }
  return cn
})

const stateStyle = computed(() => {
  const { invalid, positive } = props
  if (invalid) {
    return 'not-focus:(bg-red-1/50 border-red-6 dark:(bg-red-9/25 border-red-8))'
  }
  if (positive) {
    return 'not-focus:(bg-emerald-1/50 border-emerald-6 dark:bg-emerald-9/25 dark:(bg-emerald-9/25 border-emerald-8))'
  }
  return ''
})

const stateIconStyle = computed(() => {
  const { invalid, positive, disabled } = props
  if (invalid) {
    return 'not-focus:(text-red-6)'
  }
  if (positive) {
    return 'not-focus:(text-emerald-6)'
  }
  if (disabled) {
    return 'text-stone-3 dark:text-stone-7'
  }
  return 'color-base-lighter'
})

const value = computed({
  get: () => props.modelValue ?? '',
  set: (val: string) => emit('update:modelValue', val),
})

const emits = {
  input: (e: Event) => emit('input', (e.target as HTMLInputElement).value),
  focus: () => emit('focus'),
  blur: () => emit('blur'),
}
</script>

<template>
  <div flex="~ col gap-0.75">
    <div
      v-if="label || $slots.label"
      uppercase
      font-bold
      text="sm"
      class="color-base-lighter"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div relative>
      <input
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :readonly="loading"
        :disabled="disabled"
        w-full
        h="41px"
        p="y-2.5 x-4"
        text="base"
        border="1.5 rounded-sm"
        flex="~ gap-4"
        items-center
        outline="none focus:none"
        class="peer bg-stone-2 dark:bg-stone-8 border-transparent disabled:(bg-stone-1 dark:bg-stone-9/50 border-stone-3 dark:border-stone-7 opacity-50) focus:(bg-stone-2/75 dark:bg-stone-8 border-stone-8 dark:border-stone-3) leading-5 placeholder-stone-5/60 placeholder-shown:font-normal"
        :class="[paddingStyle, stateStyle]"
        v-on="emits"
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
          <Icon :class="[icon, stateIconStyle]" />
        </slot>
      </div>
      <div
        v-if="loading || isSlot('right')"
        absolute
        text="stone-8"
        pos="top-50% right-4"
        class="-translate-y-50%"
        :class="stateIconStyle"
        flex
        items-center
      >
        <slot v-if="loading" name="loading">
          <Icon class="i-tabler-loader-2 animate-spin" />
        </slot>
        <slot v-else name="right">
          <Icon :class="[icon, stateIconStyle]" />
        </slot>
      </div>
    </div>
    <div v-if="error || $slots.error" text="xs red-6">
      <slot name="error">
        {{ error }}
      </slot>
    </div>
    <div v-else-if="hint || $slots.hint" text="xs stone-4 dark:stone-5">
      <slot name="hint">
        {{ hint }}
      </slot>
    </div>
  </div>
</template>
