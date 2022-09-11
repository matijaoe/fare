<script setup>
useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' },
    { src: 'https://unpkg.com/flowbite@1.5.2/dist/datepicker.js"' },
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
