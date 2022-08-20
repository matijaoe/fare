<script lang="ts" setup>
import { useSidebar } from '~/store/sidebar'
const sidebar = useSidebar()
</script>

<template>
  <div flex items-center gap-3>
    <Icon i-ph-airplane-fill />
    Home
  </div>
</template>

