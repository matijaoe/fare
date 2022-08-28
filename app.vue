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
html,
body,
#__nuxt {
  font-family: "Iosevka Nerd Font", "Jetbrains Mono";
}
</style>
