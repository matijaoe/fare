<script setup lang="ts">
type Props = {
  modelValue?: string
  type?: string
  icon?: string
  iconPlacement?: 'left' | 'right'
  loading?: boolean
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

const visible = ref(false)
const toggleVisible = useToggle(visible)

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
  <FInput
    v-model="value"
    :type="visible ? 'text' : 'password'"
    :loading="loading"
    icon-placement="right"
    v-on="emits"
  >
    <template #right>
      <button
        grid
        content-center
        @click="toggleVisible()"
      >
        <Icon :name="visible ? 'tabler:eye-off' : 'tabler:eye'" />
      </button>
    </template>
  </FInput>
</template>

