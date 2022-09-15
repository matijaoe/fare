<script setup lang="ts">
type Emits = {
  (e: 'close'): void
}

const emit = defineEmits<Emits>()
</script>

<template>
  <button
    cursor="pointer"
    @click="emit('close')"
    p="1"
  >
    <Icon
      name="tabler:x"
      aspect="square"
      text="lg"
    />
  </button>
</template>
