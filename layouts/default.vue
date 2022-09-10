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
        'md:ml-270px': sidebar.isOpen,
      }]"
    >
      <LayoutHeader />
      <div
        mt="50px"
        overflow-y-auto
        h="[calc(100vh-50px)]"
      >
        <main
          p="4 md:8"
          mx-auto
          max-w="default"
          min-h="[calc(100vh-50px)]"
        >
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
