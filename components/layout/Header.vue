<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
const { smDown } = useBreakpoints()
</script>

<template>
  <header
    v-if="smDown"
    border="b-2 stone-3"
    px-4
    py-1
    flex
    items-center
    justify-between
  >
    <div
      text="2xl"
      font-black
      flex
      items-center
    >
      FI<Icon i-ph-lightning-duotone text="lg stone-9" />RE
    </div>
    <button
      grid
      content-center
      p-2
      class="translate-x-2"
      @click="sidebar.open"
    >
      <Icon i-tabler-menu-2 text="3xl" />
    </button>
  </header>
</template>
