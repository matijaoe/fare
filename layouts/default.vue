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

const sidebarWidth = computed(() => 'w-screen md:w-260px')
const headerWidth = computed(() => sidebar.isOpen ? 'sm:(w-[calc(100vw-260px)])' : 'w-screen')

const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-50px)]')
const mainContentDimensions = computed(() => 'max-w-default min-h-[calc(100vh-50px)]')
</script>

<template>
  <div>
    <LayoutSidebar :class="[sidebarWidth]" z-200 />

    <div h-screen overflow-y-auto :class="{ 'md:ml-260px': sidebar.isOpen }">
      <LayoutHeader :class="[headerWidth]" z-100 />

      <div mt="50px" overflow-y-auto :class="[mainContentWrapperHeight]">
        <main p="4 md:8" mx-auto :class="[mainContentDimensions]">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
