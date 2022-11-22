<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Dashboard', href: { name: 'index' } },
]))

const app = useNuxtApp()
</script>

<template>
  <pre>{{ app.payload.data }}</pre>
  <LayoutPage>
    <div flex flex-col gap-3>
      <Demo />
    </div>
  </LayoutPage>
</template>
