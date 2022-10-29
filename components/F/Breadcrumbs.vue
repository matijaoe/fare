<script setup lang="ts">
const store = useBreadcrumbs()

const sidebar = useSidebar()
const { smDown } = $(useBreakpoints())

const handledSidebar = computed(() => smDown || !sidebar.isOpen)
</script>

<template>
  <div
    mr-auto
    class="hidden md:flex"
    items-center
    gap-2
    h-full
    font="mono"
    :class="[{
      'border-l-2 border-base ml-5': handledSidebar,
    }]"
  >
    <template v-if="store.crumbs?.length">
      <div
        v-for="(crumb, i) in store.crumbs"
        :key="i"
        flex
        items-center
        gap-2
        :class="[store.isPreviousCrumb(i) ? 'text-zinc-4 dark:text-zinc-5' : 'color-base']"
      >
        <NuxtLink :to="crumb.href" class="hover:color-base-lighter">
          {{ crumb.label }}
        </NuxtLink>
        <span v-if="store.isPreviousCrumb(i)" text="zinc-4dark:zinc-5">/</span>
      </div>
    </template>
  </div>
</template>
