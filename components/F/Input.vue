<script lang="ts" setup>
import type { InputHTMLAttributes } from 'vue'

type Props = {
  modelValue?: string | number
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
  inputProps?: InputHTMLAttributes
}

type Emits = {
  (e: 'input', value?: string | number): void
  (e: 'focus'): void
  (e: 'blur'): void
  (e: 'update:modelValue', value?: string | number): void
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  iconPlacement: 'left',
})

const emit = defineEmits<Emits>()

const wrapperProps = computed(() => ({
  icon: props.icon,
  iconPlacement: props.iconPlacement,
  loading: props.loading,
  label: props.label,
  hint: props.hint,
  error: props.error,
  invalid: props.invalid,
  positive: props.positive,
  disabled: props.disabled,
}))

const slots = useSlots()
const isSlot = (name: 'left' | 'right') => {
  const usingSlot = slots[name]
  const usingProps = props.icon && props.iconPlacement === name
  return usingProps || usingSlot
}

const stateIconStyle = computed(() => {
  const { invalid, positive, disabled } = props
  if (invalid) {
    return 'not-focus:(text-red-5)'
  }
  if (positive) {
    return 'not-focus:(text-green-5)'
  }
  if (disabled) {
    return 'text-zinc-3 dark:text-zinc-7'
  }
  return 'color-base-lighter'
})

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
    return 'bg-red-1/50 border-red-6 dark:(bg-red-9/25 border-red-5/60)) focus:(border-red-6 dark:border-red-5/60)'
  }
  if (positive) {
    return 'bg-green-1/50 border-green-6 dark:(bg-green-9/25 border-green-5/60) focus:(border-green-6 dark:border-green-5/60)'
  }
  return 'bg-zinc-2 dark:bg-zinc-8 border-transparent focus:(border-zinc-8 dark:border-zinc-4) invalid:(bg-red-1/50 border-red-6 dark:(bg-red-9/25 border-red-5/60) focus:(border-red-6 dark:border-red-5/60))'
})

const disabledStyle = computed(() => 'disabled:(bg-zinc-1 dark:bg-zinc-9/50 border-zinc-3 dark:border-zinc-7 opacity-50 cursor-not-allowed)')

const value = computed({
  get: () => props.modelValue ?? '',
  set: (val: string | number) => emit('update:modelValue', val),
})

const emits = {
  input: (e: Event) => emit('input', (e.target as HTMLInputElement).value),
  focus: () => emit('focus'),
  blur: () => emit('blur'),
}
</script>

<template>
  <FInputWrapper v-bind="wrapperProps">
    <!-- <template v-if="$slots.label" #label>
      <slot name="label" />
    </template> -->

    <div relative>
      <div
        v-if="isSlot('left')"
        absolute
        text="zinc-8"
        pos="top-50% left-4"
        class="-translate-y-50%"
        flex
        items-center
      >
        <slot name="left">
          <Icon :name="icon" :class="[stateIconStyle]" />
        </slot>
      </div>

      <input
        v-bind="inputProps"
        v-model="value"
        :type="type"
        :placeholder="placeholder"
        :readonly="loading"
        :disabled="disabled"
        w-full
        h="41px"
        p="y-2.5 x-4"
        text="base"
        border="2 rounded-md"
        flex="~ gap-4"
        items-center
        outline="none focus:none"
        class="leading-5 placeholder-zinc-5/60 placeholder-shown:font-normal"
        :class="[disabledStyle, paddingStyle, stateStyle]"
        v-on="emits"
      >

      <div
        v-if="loading || isSlot('right')"
        absolute
        pos="top-50% right-4"
        class="-translate-y-50%"
        :class="stateIconStyle"
        flex
        items-center
      >
        <slot v-if="loading" name="loading">
          <Icon name="tabler:loader-2" class="animate-spin" />
        </slot>
        <slot v-else name="right">
          <Icon :name="icon" :class="[stateIconStyle]" />
        </slot>
      </div>
    </div>
    <!--
    <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template> -->
  </FInputWrapper>
</template>
