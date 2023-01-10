<script lang="ts" setup>
const sidebar = useSidebar()

const sidebarWidth = computed(() => 'w-screen md:w-240px')
const headerWidth = computed(() => sidebar.isOpen ? 'sm:(w-[calc(100vw-240px)])' : 'w-screen')

const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-50px-60px)] md:h-[calc(100vh-50px)]')
const mainContentWrapperMargin = computed(() => 'mt-[calc(50px+60px)] md:mt-60px')
</script>

<template>
  <div>
    <Sidebar
      z-200
      :class="[sidebarWidth, { 'lt-md:hidden': !sidebar.isOpen }]"
    />

    <div class="md:ml-240px">
      <Header :class="[headerWidth]" z-100 />

      <DateSwitchHeader
        :class="[headerWidth]"
        z-100
        pos="fixed top-0 right-0"
        p="x-3 md:x-6 y-2"
        border="b-2"
        border-base
        class="mt-[50px] md:mt-0"
      />

      <div overflow-y-auto>
        <main mx-auto :class="[mainContentWrapperHeight, mainContentWrapperMargin]">
          <slot />
        </main>
      </div>
    </div>
    <TransactionAddBar
      fixed
      bottom-6
      right-6
    />
  </div>
</template>
