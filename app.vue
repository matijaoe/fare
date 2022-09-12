<script setup>
useHead({
  title: 'FIRE',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' },
  ],
})

useShortcuts()
</script>

<template>
  <div
    font="mono"
    h="screen"
    overflow="hidden"
    class="bg-base color-base"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Staatliches&display=swap');
</style>
