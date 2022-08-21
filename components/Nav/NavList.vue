<script lang="ts" setup>
import type { NavItemModel } from '~~/models/nav'

const items = ref<NavItemModel[]>([
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
  {
    label: 'Tools',
    icon: 'i-tabler-tools',
    route: {
      name: 'tools',
    },
  },
  {
    label: 'Resources',
    icon: 'i-tabler-books',
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

