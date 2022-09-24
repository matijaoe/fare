<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
</script>

<template>
  <header
    fixed
    top-0
    flex
    justify-between
    items-center
    h-50px
    border="b-2 base"
    class="color-base-lighter"
  >
    <HeaderLogo />
    <FBreadcrumbs />

    <!-- <div
      flex-1
      flex
      relative
      class="border-r-2 border-base ml-5"
      ml-auto
      max-w="xs"
      h-full
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
        class="color-base placeholder-zinc-4/65 placeholder-shown:font-normal bg-transparent"
        outline="none focus:none"
      >
      <Icon
        name="tabler:search"
        absolute
        pos="top-50% left-5"
        class="-translate-y-50%"
      />
    </div> -->

    <button
      grid
      content-center
      p="y-2.5 x-3"
      bg="hover:zinc-1 hover:dark:zinc-8"
      @click="sidebar.toggle()"
    >
      <Icon name="tabler:menu-2" text="2xl" />
    </button>
  </header>
</template>
