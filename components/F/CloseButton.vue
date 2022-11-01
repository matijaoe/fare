<script setup lang="ts">
type Emits = {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <button
    p-1
    cursor-pointer
    @click="emit('close')"
  >
    <Icon
      name="tabler:x"
      aspect="square"
      text="lg"
    />
  </button>
</template>
