<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'
import { appBreakpoints } from '~~/composables/breakpoints'
const sidebar = useSidebar()

const { width } = useWindowSize()

watch(width, (val: number, prevVal: number) => {
  if (val > appBreakpoints.sm && prevVal < appBreakpoints.sm) {
    sidebar.open()
  } else if (val < appBreakpoints.sm && prevVal > appBreakpoints.sm) {
    sidebar.close()
  }
})
</script>

<template>
  <div>
    <LayoutSidebar />
    <div
      h-screen
      overflow-y-auto
      :class="[{
        'sm:ml-280px': sidebar.isOpen,
      }]"
    >
      <LayoutHeader />
      <main
        overflow-y-auto
        p-8
        max-w="1440px"
        mt="50px"
        mx-auto
      >
        <slot />
      </main>
    </div>
  </div>
</template>
