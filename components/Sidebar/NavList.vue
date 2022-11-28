<script lang="ts" setup>
const items = [
  {
    label: 'Dashboard',
    icon: 'tabler:sofa',
    route: {
      name: 'index',
    },
  },
  {
    label: 'Activity',
    icon: 'tabler:activity',
    route: {
      name: 'activity',
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
    label: 'Nest egg',
    icon: 'tabler:egg',
    route: {
      name: 'nest-egg',
    },
  },
  {
    label: 'Categories',
    icon: 'tabler:packages',
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
    label: 'Config',
    icon: 'tabler:adjustments-alt',
    route: {
      name: 'config',
    },
  },
]
</script>

<template>
  <ul>
    <SidebarNavItem
      v-for="item in items"
      :key="item.label"
      :item="item"
    />
  </ul>
</template>
