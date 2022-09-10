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
    return 'bg-red-1/50 border-red-6 dark:(bg-red-9/25 border-red-5/60)) focus:(bg-zinc-1 dark:bg-zinc-8)'
  }
  if (positive) {
    return 'bg-green-1/50 border-green-6 dark:(bg-green-9/25 border-green-5/60) focus:(bg-zinc-1 dark:bg-zinc-8)'
  }
  return 'bg-zinc-2 dark:bg-zinc-8 border-transparent focus:(bg-zinc-1 dark:bg-zinc-8 border-zinc-8/50 dark:border-zinc-5)'
})

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

const disabledStyle = computed(() => 'disabled:(bg-zinc-1 dark:bg-zinc-9/50 border-zinc-3 dark:border-zinc-7 opacity-50 cursor-not-allowed)')

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
        border="2 rounded-sm"
        flex="~ gap-4"
        items-center
        outline="none focus:none"
        class="leading-5 placeholder-zinc-5/60 placeholder-shown:font-normal"
        :class="[disabledStyle, paddingStyle, stateStyle]"
        v-on="emits"
      >
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
    <div v-if="error || $slots.error" text="xs red-5">
      <slot name="error">
        {{ error }}
      </slot>
    </div>
    <div v-else-if="hint || $slots.hint" text="xs zinc-4 dark:zinc-5">
      <slot name="hint">
        {{ hint }}
      </slot>
    </div>
  </div>
</template>
