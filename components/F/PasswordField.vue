<script setup lang="ts">
type Props = {
  type?: string
  icon?: string
  iconPlacement?: 'left' | 'right'
  loading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  size: 'md',
  iconPlacement: 'left',
})

const visible = ref(false)
const toggleVisible = useToggle(visible)
</script>

<template>
  <FInput
    :type="visible ? 'text' : 'password'"
    :loading="loading"
    icon-placement="right"
    v-on="props"
  >
    <template #right>
      <button
        grid
        content-center
        @click="toggleVisible()"
      >
        <Icon :class="visible ? 'i-tabler-eye-off' : 'i-tabler-eye'" />
      </button>
    </template>
  </FInput>
</template>

