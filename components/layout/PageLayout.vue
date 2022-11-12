<script lang="ts" setup>
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-68px)]')
</script>

<template>
  <div
    space-y-8
    pb-20
    p="4 md:(x-8 t-7 b-10)"
    overflow-y-auto
    :class="mainContentWrapperHeight"
  >
    <div
      space-y-10
      mx-auto
    >
      <slot />
    </div>
  </div>
</template>
