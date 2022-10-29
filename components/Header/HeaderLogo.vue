<script setup lang="ts">
const sidebar = useSidebar()
const { smDown } = $(useBreakpoints())

const handledSidebar = computed(() => smDown || !sidebar.isOpen)
</script>

<template>
  <NuxtLink
    v-if="handledSidebar"
    pl-4
    flex
    items-center
    justify-center
    to="/"
  >
    <FLogo />
  </NuxtLink>
</template>
