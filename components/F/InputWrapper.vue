<script setup lang="ts">
type Props = {
  icon?: string
  iconPlacement?: 'left' | 'right'
  loading?: boolean
  label?: string
  hint?: string
  error?: string
  invalid?: boolean
  positive?: boolean
  disabled?: boolean
}

defineProps<Props>()
</script>

<template>
  <div flex="~ col gap-0.75">
    <div
      v-if="label || $slots.label"
      uppercase
      font="sans bold"
      text="xs"
      class="color-base-lighter"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <slot />
    <div v-if="(error || $slots.error) && invalid" text="xs red-5">
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
