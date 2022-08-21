<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'
const sidebar = useSidebar()
const { smDown } = useBreakpoints()
</script>

<template>
  <div
    absolute
    inset-0
    h-screen
    w="screen sm:280px"
    py-4
    overflow-y="auto"
    border="r-0 sm:r-2 stone-3"
    bg="stone-1"
    z-1000
    :class="{ '!hidden': !sidebar.isOpen }"
    flex
    flex-col
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
        <FLogo size="lg" />
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
          @click="sidebar.close()"
        />
      </button>
    </div>

    <div
      border="y-2 transparent focus:stone-2"
      p="y-2.5 x-7"
      flex
      items-center
      gap-4
    >
      <Icon i-tabler-search />
      <p text="stone-8/50" font="normal">
        Search
      </p>
    </div>

    <NavList mt-3 flex-1 />

    <NavControls />
  </div>
</template>
