<script lang="ts" setup>
import { set } from '@vueuse/core'
import type { NavItemModel } from '~/models/nav'

import { useSidebar } from '~/store/sidebar'

type Props = {
  item: NavItemModel
  childLevel?: 1 | 2
}

const { item, childLevel } = defineProps<Props>()

const sidebar = useSidebar()

const route = useRoute()
const isParentRoute = computed(() => route.fullPath.startsWith(`/${item.route.name}`))
const isActiveRoute = computed(() => route.name === item.route.name!)

const isOpen = ref(false)
const toggleChildren = () => set(isOpen, !isOpen.value)
const hasChildren = computed(() => !!item?.children?.length)

watch(route, () => {
  // close all other indents on route change
  if (!isActiveRoute.value && !isParentRoute.value) {
    set(isOpen, false)
  } else if (isActiveRoute.value) {
    set(isOpen, true)
  }
})

const childIndent = computed(() => {
  switch (childLevel) {
    case 1:
      return 'pl-14'
    case 2:
      return 'pl-21'
    default:
      return 'pl-7'
  }
})
</script>

<template>
  <li block>
    <NuxtLink
      cursor="pointer"
      :to="item.route"
      flex="~ gap-2"
      items-center
      border="y-2 y-transparent"
      exact-active-class="bg-stone-2/40 text-stone-9 !border-stone-3"
      class="text-stone-8 text-sm hover:(bg-stone-2/55 text-stone-9)"
      @click="isActiveRoute && hasChildren ? toggleChildren() : sidebar.close()"
    >
      <div
        w-full
        py-3
        flex="~ gap-4"
        :class="[childLevel ? childIndent : 'pl-7']"
        items-center
      >
        <Icon :class="item.icon" text="base" />
        <p>{{ item.label }}</p>
      </div>
      <button
        v-if="hasChildren"
        p-1
        mr-5
        grid
        content-center
        class="hover:bg-stone-3/50 rounded-full"
      >
        <Icon
          :class="isOpen ? 'i-tabler-chevron-up' : 'i-tabler-chevron-down'"
          text="base"
        />
      </button>
    </NuxtLink>
    <div v-if="isOpen && $slots.default">
      <slot />
    </div>
  </li>
</template>
