<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'

const sidebar = useSidebar()
const { mdDown } = useBreakpoints()
</script>

<template>
  <div
    absolute
    inset-0
    h-screen
    py-4
    bg="zinc-50 dark:zinc-9"
    overflow-y="auto"
    border="r-0 md:r-2 base"
    z-1000
    :class="{ '!hidden': !sidebar.isOpen }"
    flex
    flex-col
  >
    <div
      flex
      items-center
      justify-between
      mt-2
      mb-6
      px-8
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
