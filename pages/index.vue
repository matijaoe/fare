<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'
const sidebar = useSidebar()
</script>

<template>
  <div>
    {{ $route.name }}
    <Icon i-ph-airplane-fill />
    <button @click="sidebar.open">
      open sidebarfds
    </button>
  </div>
</template>

