<script lang="ts" setup>
import { set } from '@vueuse/core'
import type { NavItemModel } from '~/models/ui'

type Props = {
  item: NavItemModel
  childLevel?: 1 | 2
}

const { item, childLevel } = defineProps<Props>()

const sidebar = useSidebar()
const { mdDown } = $(useBreakpoints())

const route = useRoute()
const isParentRoute = $computed(() => route.name?.toString().split('-')[0] === item.route.name)
const isActiveRoute = $computed(() => route.name === item.route.name)

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

const isActive = $computed(() => isActiveRoute || isParentRoute)

// hover:(bg-zinc-1 dark:bg-zinc-8/40)
</script>

<template>
  <li block>
    <NuxtLink
      :to="item.route"
      flex="~ gap-2"
      items-center
      class="color-base-lighter text-lg md:text-base "
      :class="isActive ? 'bg-zinc-200 dark:bg-zinc-8/40' : 'hover:(bg-zinc-1 dark:bg-zinc-8/40)'"
      outline="none"
      @click="handleNavClick"
    >
      <div
        w-full p="y-1.5"
        flex="~ gap-6 md:gap-4" items-center
        :class="[indentStyle]"
      >
        <div p-1 flex-center rounded-lg>
          <Icon :name="item.icon" text="xl md:base" />
        </div>
        <p>{{ item.label }}</p>
      </div>
      <button
        v-if="hasChildren"
        p-1 mr-3 grid content-center
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

