<script lang="ts" setup>
const sidebar = useSidebar()

const sidebarWidth = computed(() => 'w-screen md:w-240px')
const headerWidth = computed(() => sidebar.isOpen ? 'sm:(w-[calc(100vw-240px)])' : 'w-screen')

// TODO: weird small scroll on list page
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-60px)]')
</script>

<template>
  <div>
    <Sidebar :class="[sidebarWidth]" z-200 />

    <div :class="{ 'md:ml-240px': sidebar.isOpen }">
      <!-- <Header :class="[headerWidth]" z-100 /> -->
      <DateSwitchHeader
        :class="[headerWidth]"
        z-100
        pos="fixed top-0 right-0"
        p="x-6 y-2"
        border="b-2"
        border-base
        class="bg-base"
      />

      <div
        mt="60px"
        overflow-y-auto
      >
        <main mx-auto :class="[mainContentWrapperHeight]">
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
