<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
</script>

<template>
  <div>
    <LayoutSidebar
      :class="[sidebar.isOpen ? 'block sm:block' : 'hidden sm:block']"
    />
    <div
      h-screen
      ml="0 sm:280px"
      mt="55px sm:0"
      overflow-y-auto
    >
      <LayoutHeader
        class="block sm:hidden"
      />
      <main
        p-4
      >
        <slot />
      </main>
    </div>
  </div>
</template>
