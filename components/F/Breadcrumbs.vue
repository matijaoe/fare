<script setup lang="ts">
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
const { smDown } = $(useBreakpoints())

const handledSidebar = computed(() => smDown || !sidebar.isOpen)
</script>

<template>
  <div
    mr-auto
    class="hidden md:flex"
    items-center
    gap-2
    h-full
    pl="6"
    font="mono"
    :class="[{
      'border-l-2 border-base ml-5': handledSidebar,
    }]"
  >
    <span text="zinc-4 dark:zinc-5">Home</span>
    <span text="zinc-4 dark:zinc-5">/</span>
    <span>{{ $route.name }}</span>
  </div>
</template>
