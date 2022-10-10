<script lang="ts" setup>
const sidebar = useSidebar()
const { mdDown } = useBreakpoints()
</script>

<template>
  <div
    font-mono
    absolute
    inset-0
    h-screen
    py-4
    bg="white dark:zinc-9"
    overflow-y="auto"
    border="r-0 md:r-2 base"
    flex="~ col"
    :class="{ '!hidden': !sidebar.isOpen }"
  >
    <div
      flex
      items-center
      justify-between
      mt-2
      mb-6
      px-6
    >
      <NuxtLink to="/">
        <FLogo size="lg" />
      </NuxtLink>
      <button
        v-if="mdDown"
        grid
        content-center
        p-2
        class="translate-x-2"
      >
        <Icon
          name="tabler:x"
          text="2xl"
          @click="sidebar.close()"
        />
      </button>
    </div>

    <NavList flex-1 />

    <NavControls max-w="fit" mx-auto />
  </div>
</template>
