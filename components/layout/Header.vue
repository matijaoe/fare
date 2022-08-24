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
    justify-between
    h-50px
    bg="base"
    border="b-2 base"
    class="color-base-lighter"
    :class="[
      sidebar.isOpen ? 'sm:(w-[calc(100vw-270px)])' : 'w-screen',
    ]"
  >
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
    <div
      flex-1
      flex
      relative
      :class="[{
        'border-l-2 border-base ml-5': handledSidebar,
      }]"
    >
      <input
        type="text"
        h-full
        w-full
        placeholder="Search"
        p="x-5 l-13"
        flex
        items-center
        gap-4
        class="color-base placeholder-stone-4/65 placeholder-shown:font-normal bg-transparent"
        outline="none focus:none"
      >
      <Icon
        i-tabler-search
        absolute
        pos="top-50% left-5"
        class="-translate-y-50%"
      />
    </div>
    <button
      ml-auto
      grid
      content-center
      p="y-2.5 x-3"
      bg="hover:stone-2/40 dark:hover:stone-8"
      border="l-2 base"

      @click="sidebar.toggle()"
    >
      <Icon i-tabler-menu-2 text="2xl" />
    </button>
  </header>
</template>
