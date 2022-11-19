<script lang="ts" setup>
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-60px)]')
</script>

<template>
  <div
    space-y-8
    p="4 b-20 md:(x-8 t-7)"
    overflow-y-auto
    :class="mainContentWrapperHeight"
  >
    <div space-y-10 mx-auto>
      <slot />
    </div>
  </div>
</template>
