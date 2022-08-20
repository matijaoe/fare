<script lang="ts" setup>
import type { NavItemModel } from '~~/models/nav'
import { useSidebar } from '~/store/sidebar'

const emit = defineEmits<{
  (e: 'close'): void
}>()

const sidebar = useSidebar()
const { smDown, smUp } = useBreakpoints()

const navItems = ref<NavItemModel[]>([
  {
    label: 'Dashboard',
    icon: 'i-tabler-home',
    route: {
      name: 'index',
    },
  },
  {
    label: 'Expenses',
    icon: 'i-tabler-receipt',
    route: {
      name: 'expenses',
    },
    children: [
      {
        label: 'Income',
        icon: 'i-tabler-arrows-transfer-up',
        route: {
          name: 'expenses-income',
        },
      },
      {
        label: 'Transfers',
        icon: 'i-tabler-arrows-transfer-down',
        route: {
          name: 'expenses-transfers',
        },
      },

    ],
  },
  {
    label: 'Net worth',
    icon: 'i-tabler-businessplan',
    route: {
      name: 'net-worth',
    },
  },
  {
    label: 'Accounts',
    icon: 'i-tabler-wallet',
    route: {
      name: 'accounts',
    },
  },
  {
    label: 'FI',
    icon: 'i-tabler-flame',
    route: {
      name: 'fi',
    },
  },
  {
    label: 'Progress',
    icon: 'i-tabler-chart-area-line',
    route: {
      name: 'progress',
    },
    children: [
      {
        label: 'Coast FIRE',
        icon: 'i-tabler-chart-area-line',
        route: {
          name: 'progress-fire',
        },
      },
    ],
  },
])
</script>

<template>
  <div
    v-if="sidebar.isOpen || smUp"
    fixed
    h-screen
    w="screen sm:280px"
    py-4
    overflow="scroll"
    border="r-0 sm:r-2 stone-3"
    bg="stone-1"
    z-1000
  >
    <div
      flex
      items-center
      justify-between
      mt-2
      mb-5
      px-8
    >
      <NuxtLink to="/">
        <NavLogo />
      </NuxtLink>
      <button
        v-if="smDown"
        flex
        items-center
        justify-center
        p-2
        class="translate-x-2"
      >
        <Icon
          i-tabler-x
          text="2xl"
          @click="sidebar.close"
        />
      </button>
    </div>
    <NavList :items="navItems" />
  </div>
</template>
