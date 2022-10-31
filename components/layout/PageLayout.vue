<script lang="ts" setup>
defineProps<{
  range: boolean
}>()

const mainContentDimensions = computed(() => 'max-w-default min-h-[calc(100vh-50px)]')
</script>

<template>
  <div space-y-8>
    <LazyDateSwitchHeader v-if="range" />

    <div
      space-y-10
      mx-auto
      :class="[mainContentDimensions]"
    >
      <slot />
    </div>
  </div>
</template>
