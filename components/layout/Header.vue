<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
const { smDown } = $(useBreakpoints())

const handledSidebar = computed(() => smDown || !sidebar.isOpen)
</script>

<template>
  <header
    fixed
    top-0
    z-100
    flex
    items-center
    justify-between
    bg="stone-1"
    border="b-2 stone-3"
    :class="[
      sidebar.isOpen ? 'sm:(w-[calc(100vw-280px)])' : 'w-screen',
    ]"
  >
    <NuxtLink
      v-if="handledSidebar"
      pl-4
      to="/"
    >
      <FLogo />
    </NuxtLink>
    <div
      border="focus:stone-2"
      p="x-5"
      flex
      items-center
      gap-4
      flex-1
      :class="[{
        'border-l-2 border-stone-3 ml-5': handledSidebar,
      }]"
    >
      <Icon i-tabler-search />
      <p text="stone-8/30" font="normal">
        Search
      </p>
    </div>
    <button
      ml-auto
      grid
      content-center
      p="y-2.5 x-3"
      bg="hover:stone-2/55"
      border="l-2 stone-3"

      @click="sidebar.toggle()"
    >
      <Icon i-tabler-menu-2 text="2xl" />
    </button>
  </header>
</template>
