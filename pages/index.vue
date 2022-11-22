<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Dashboard', href: { name: 'index' } },
]))
</script>

<template>
  <LayoutPage>
    <div flex flex-col gap-3>
      <Demo />
    </div>
  </LayoutPage>
</template>
