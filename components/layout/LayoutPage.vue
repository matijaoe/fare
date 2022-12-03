<script lang="ts" setup>
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-60px)]')
</script>

<template>
  <div
    p="4 b-30 md:(x-8 t-8)"
    overflow-y-auto
    max-w-7xl
    mx-auto
  >
    <div space-y-10 mx-auto>
      <slot />
    </div>
  </div>
</template>
