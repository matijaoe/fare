<script setup lang="ts">
type Props = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'danger' | 'success'
  size: 'sm' | 'md'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
})

const variantStyle = computed(() => {
  switch (props.variant) {
    case 'primary':
      return 'bg-stone-9 text-stone-1 hover:(bg-stone-8)'
    case 'secondary':
      return 'bg-stone-2 text-stone-8 hover:(bg-stone-3/75 text-stone-9)'
    case 'tertiary':
      return 'bg-transparent text-stone-8 hover:(bg-stone-2/75 text-stone-9)'
    case 'outline':
      return 'bg-transparent text-stone-8 !border-current hover:(bg-stone-2 text-stone-9)'
    case 'danger':
      return 'bg-red-5/85 text-stone-8 !border-current hover:(bg-red-5/75)'
    case 'success':
      return 'bg-green-5/85 text-stone-8 !border-current hover:(bg-green-5/75)'
  }
})

const sizeStyle = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'py-1 px-2.5 text-xs'
    case 'md':
      return 'py-1.75 px-5 text-sm'
  }
})
</script>

<template>
  <button
    font="bold"
    border="1.5 transparent"
    class="rounded-sm  uppercase disabled:(opacity-40 cursor-not-allowed)"
    :class="[variantStyle, sizeStyle]"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>

</style>
