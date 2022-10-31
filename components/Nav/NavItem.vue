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
const isParentRoute = $computed(() => route.fullPath.startsWith(`/${item.route.name}`))
const isActiveRoute = $computed(() => route.name === item.route.name!)

// TODO: exact-active-class not matching accounts/:id

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
      :to="item.route"
      flex="~ gap-2"
      items-center
      class="color-base-lighter text-lg md:text-sm group hover:(bg-zinc-1 dark:bg-zinc-8/40)"
      exact-active-class="bg-zinc-1 dark:bg-zinc-8/40"
      outline="none"
      @click="handleNavClick"
    >
      <div
        w-full
        p="y-1.5"
        flex="~ gap-6 md:gap-4"
        :class="[indentStyle]"
        items-center
      >
        <div
          p-3
          sm:p-2
          flex-center
          bg="zinc-1 bg-zinc-8"
          text="zinc-8 dark:text-zinc-4"
          rounded-lg
          class="icon-wrapper group-hover:bg-zinc-2"
        >
          <Icon :name="item.icon" text="xl md:sm" />
        </div>
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

<style scoped>
.router-link-active .icon-wrapper {
  background: #18181b !important;
  color: #e4e4e7;
}
</style>
