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
    label: 'Categories',
    icon: 'tabler:category-2',
    route: {
      name: 'categories',
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
    label: 'Net worth',
    icon: 'tabler:chart-line',
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
  // TODO: milestones
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
