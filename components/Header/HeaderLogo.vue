<script setup lang="ts">
const sidebar = useSidebar()
const { smDown } = $(useBreakpoints())

const handledSidebar = computed(() => smDown || !sidebar.isOpen)
</script>

<template>
  <NuxtLink
    v-if="handledSidebar"
    flex items-center justify-center pl-4
    to="/"
  >
    <FLogo />
  </NuxtLink>
</template>
