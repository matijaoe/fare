<script lang="ts" setup>
import type { NavItemModel } from '~~/models/nav'

defineProps<{
  items: NavItemModel[]
}>()
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

