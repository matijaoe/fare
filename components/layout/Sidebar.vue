<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
const { smDown, smUp } = useBreakpoints()
</script>

<template>
  <div
    absolute
    inset-0
    h-screen
    w="screen sm:280px"
    py-4
    overflow="scroll"
    border="r-0 sm:r-2 stone-3"
    bg="stone-1"
    z-1000
  >
    <div
      flex
      items-center
      justify-between
      mt-2
      mb-5
      px-8
    >
      <NuxtLink to="/">
        <NavLogo />
      </NuxtLink>
      <button
        v-if="smDown"
        grid
        content-center
        p-2
        class="translate-x-2"
      >
        <Icon
          i-tabler-x
          text="2xl"
          @click="sidebar.close"
        />
      </button>
    </div>
    <NavList />
  </div>
</template>
