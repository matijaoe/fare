<script lang="ts" setup>
const items = [
  {
    label: 'Dashboard',
    icon: 'tabler:home',
    route: {
      name: 'index',
    },
  },
  {
    label: 'Transactions',
    icon: 'tabler:receipt',
    route: {
      name: 'transactions',
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
    label: 'Categories',
    icon: 'tabler:box-padding',
    route: {
      name: 'categories',
    },
  },
  {
    label: 'Net worth',
    icon: 'tabler:businessplan',
    route: {
      name: 'net-worth',
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
  {
    label: 'Login page',
    icon: 'tabler:lungs',
    route: {
      name: 'login',
    },
  },
]
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
