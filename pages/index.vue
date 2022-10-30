<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Dashboard', href: { name: 'index' } },
]))
</script>

<template>
  <div flex flex-col gap-3>
    <div flex items-center gap-3>
      <Icon name="tabler:plane" />
      <h1>Dashboard</h1>
    </div>
    <!-- <ChartDemo /> -->
    <Demo />
  </div>
</template>
