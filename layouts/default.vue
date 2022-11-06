<script lang="ts" setup>
const sidebar = useSidebar()

const sidebarWidth = computed(() => 'w-screen md:w-260px')
const headerWidth = computed(() => sidebar.isOpen ? 'sm:(w-[calc(100vw-260px)])' : 'w-screen')

const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-50px)]')
</script>

<template>
  <div>
    <ClientOnly>
      <LayoutSidebar :class="[sidebarWidth]" z-200 />
    </ClientOnly>

    <div h-screen :class="{ 'md:ml-260px': sidebar.isOpen }">
      <Header :class="[headerWidth]" z-100 />

      <div mt="50px" overflow-y-auto :class="[mainContentWrapperHeight]">
        <main p="4 md:(x-8 t-7 b-10)" mx-auto>
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>
