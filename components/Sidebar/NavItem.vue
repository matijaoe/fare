<script lang="ts" setup>
import { set } from '@vueuse/core'
import type { NavItemModel } from '~/models/ui'

const { item } = defineProps<{
  item: NavItemModel
}>()

const sidebar = useSidebar()
const { mdDown } = $(useBreakpoints())

const route = useRoute()
const isParentRoute = $computed(() => route.name?.toString().split('-')[0] === item.route.name)
const isActiveRoute = $computed(() => route.name === item.route.name)
const isActive = $computed(() => isActiveRoute || isParentRoute)

const handleNavClick = () => {
  return mdDown ? sidebar.close() : ''
}
</script>

<template>
  <li block>
    <NuxtLink
      :to="item.route"
      flex="~ gap-2" items-center
      pl-6
      class="color-base-lighter text-lg md:text-base "
      :class="isActive ? 'bg-zinc-2 dark:bg-zinc-8/40' : 'hover:(bg-zinc-1 dark:bg-zinc-8/40)'"
      outline="none"
      @click="handleNavClick"
    >
      <div
        w-full p="y-1.5"
        flex="~ gap-6 md:gap-4" items-center
      >
        <div p-1 flex-center rounded-lg>
          <Icon :name="item.icon" text="xl md:base" />
        </div>
        <p>{{ item.label }}</p>
      </div>
    </NuxtLink>
  </li>
</template>

