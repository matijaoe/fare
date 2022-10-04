<script lang="ts" setup>
import { set } from '@vueuse/core'
import type { NavItemModel } from '~/models/ui'
import { useSidebar } from '~/store/sidebar'

type Props = {
  item: NavItemModel
  childLevel?: 1 | 2
}

const { item, childLevel } = defineProps<Props>()

const sidebar = useSidebar()
const { mdDown } = $(useBreakpoints())

const route = useRoute()
const isParentRoute = $computed(() => route.fullPath.startsWith(`/${item.route.name}`))
const isActiveRoute = $computed(() => route.name === item.route.name!)

const isOpen = ref(false)
const toggleChildren = () => set(isOpen, !isOpen.value)
const hasChildren = $computed(() => !!item?.children?.length)

watch(route, () => {
  // close all other indents on route change
  if (!isActiveRoute && !isParentRoute) {
    set(isOpen, false)
  } else if (isActiveRoute) {
    set(isOpen, true)
  }
})

const indentStyle = computed(() => {
  switch (childLevel) {
    case 1:
      return 'pl-10'
    case 2:
      return 'pl-16'
    default:
      return 'pl-6'
  }
})

const handleNavClick = () => {
  return isActiveRoute && hasChildren ? toggleChildren() : mdDown ? sidebar.close() : ''
}
</script>

<template>
  <li block>
    <NuxtLink
      cursor="pointer"
      :to="item.route"
      flex="~ gap-2"
      items-center
      border="y-1 y-transparent"
      exact-active-class="!bg-zinc-2/80 dark:!bg-zinc-8 !color-base"
      class="color-base-lighter text-lg md:text-base hover:(bg-zinc-2/50 dark:bg-zinc-8 color-base-lighter) focus:(bg-zinc-2/50 dark:bg-zinc-8 color-base)"
      outline="none"
      @click="handleNavClick"
    >
      <div
        w-full
        p="y-2"
        flex="~ gap-5 sm:gap-4"
        :class="[indentStyle]"
        items-center
      >
        <Icon :name="item.icon" text="xl md:base" />
        <p>{{ item.label }}</p>
      </div>
      <button
        v-if="hasChildren"
        p-1
        mr-3
        grid
        content-center
        class="hover:bg-zinc-2/50 rounded-full"
      >
        <Icon
          :name="isOpen ? 'tabler:chevron-up' : 'tabler:chevron-down'"
          text="base"
        />
      </button>
    </NuxtLink>
    <div v-if="isOpen && $slots.default">
      <slot />
    </div>
  </li>
</template>
