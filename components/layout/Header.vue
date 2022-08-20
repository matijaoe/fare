<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
</script>

<template>
  <header
    w-full
    fixed
    top-0
    z-100
    p="y-1 x-4"
    px-4
    py-1
    flex
    items-center
    justify-between
    bg="stone-1"
    border="b-2 stone-3"
  >
    <NuxtLink
      to="/"
      class="text-xl"
      font-black
      flex
      items-center
    >
      FI<Icon i-ph-lightning-duotone text="lg stone-9" />RE
    </NuxtLink>
    <button
      grid
      content-center
      p-2
      class="translate-x-2"
      @click="sidebar.open()"
    >
      <Icon i-tabler-menu-2 text="2xl" />
    </button>
  </header>
</template>
