<script lang="ts" setup>
const sidebar = useSidebar()
const { mdDown } = useBreakpoints()

const { isLoading: isNetWorthLoading, netWorthFormatted, netWorth } = useNetWorth()
</script>

<template>
  <div
    absolute inset-0 h-screen overflow-y-auto
    pt-4 font-mono bg="white dark:zinc-9" border="r-0 md:r-2 base"
    flex="~ col gap-6"
    :class="{ '!hidden': !sidebar.isOpen }"
  >
    <div flex items-center justify-between mt-2 px-6>
      <NuxtLink to="/">
        <FLogo size="lg" />
      </NuxtLink>
      <button
        v-if="mdDown"
        grid content-center p-2 class="translate-x-2"
      >
        <Icon
          name="tabler:x"
          text="2xl"
          @click="sidebar.close()"
        />
      </button>
    </div>

    <SidebarNavList flex-1 />

    <div bg="zinc-1 dark:transparent">
      <div flex="~ col gap-0.5" p="4 y-3">
        <p text="xs zinc-4" font="sans medium" uppercase>
          Net worth
        </p>
        <div flex gap-2 items-center>
          <FSkeleton
            v-if="isNetWorthLoading"
            class="h-36px w-30"
          />
          <p v-else-if="netWorth" text-3xl font-display font-medium>
            {{ netWorthFormatted }}
          </p>
        </div>
      </div>

      <SidebarControls py-4 max-w="fit" mx-auto />
    </div>
  </div>
</template>
