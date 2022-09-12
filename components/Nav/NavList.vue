<script lang="ts" setup>
import type { NavItemModel } from '~~/models/nav'

const items = ref<NavItemModel[]>([
  {
    label: 'Dashboard',
    icon: 'tabler:home',
    route: {
      name: 'index',
    },
  },
  {
    label: 'Expenses',
    icon: 'tabler:receipt',
    route: {
      name: 'expenses',
    },
    children: [
      {
        label: 'Income',
        icon: 'tabler:arrows-transfer-up',
        route: {
          name: 'expenses-income',
        },
      },
      {
        label: 'Transfers',
        icon: 'tabler:arrows-transfer-down',
        route: {
          name: 'expenses-transfers',
        },
      },

    ],
  },
  {
    label: 'Net worth',
    icon: 'tabler:businessplan',
    route: {
      name: 'net-worth',
    },
  },
  {
    label: 'Accounts',
    icon: 'tabler:wallet',
    route: {
      name: 'accounts',
    },
  },
  {
    label: 'FI',
    icon: 'tabler:flame',
    route: {
      name: 'fi',
    },
  },
  {
    label: 'Progress',
    icon: 'tabler:chart-area-line',
    route: {
      name: 'progress',
    },
    children: [
      {
        label: 'Coast FIRE',
        icon: 'tabler:chart-area-line',
        route: {
          name: 'progress-fire',
        },
      },
    ],
  },
  {
    label: 'Tools',
    icon: 'tabler:tools',
    route: {
      name: 'tools',
    },
  },
  {
    label: 'Resources',
    icon: 'tabler:books',
    route: {
      name: 'resources',
    },
  },
])
</script>

<template>
  <ul>
    <NavItem v-for="item in items" :key="item.label" :item="item">
      <ul v-if="item.children">
        <NavItem
          v-for="child in item.children"
          :key="child.label"
          :item="child"
          :child-level="1"
        />
      </ul>
    </NavItem>
  </ul>
</template>

