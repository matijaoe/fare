<script lang="ts" setup>
const sidebar = useSidebar()
</script>

<template>
  <header
    fixed top-0 h-50px
    flex justify-between items-center
    border="b-2" border-base
    bg-base
    class="color-base-lighter"
  >
    <HeaderLogo />

    <ClientOnly>
      <FBreadcrumbs pl-8 />
    </ClientOnly>

    <!-- <HeaderSearch border="r-2" border-base ml-auto /> -->

    <button
      grid content-center
      p="y-2.5 x-3"
      bg="hover:zinc-1 hover:dark:zinc-8"
      @click="sidebar.toggle()"
    >
      <Icon name="tabler:menu-2" text="2xl" />
    </button>
  </header>
</template>
