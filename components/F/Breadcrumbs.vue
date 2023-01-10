<script setup lang="ts">
const store = useBreadcrumbs()

const sidebar = useSidebar()
</script>

<template>
  <div
    mr-auto h-full
    font="mono"
    class="hidden md:flex lt-sm:border-l-2 border-base ml-5"
    items-center gap-2
    :class="[{
      'lt-sm:border-l-2 border-base ml-5': !sidebar.isOpen,
    }]"
  >
    <template v-if="store.crumbs?.length">
      <div
        v-for="(crumb, i) in store.crumbs"
        :key="i"
        flex items-center gap-2
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
