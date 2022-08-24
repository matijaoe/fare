<script setup>
useHead({
  title: 'Vitesse Nuxt 3',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
</script>

<template>
  <div
    bg="stone-50"
    text="stone-9"
    h="screen"
    overflow="hidden"
    font="medium"
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
  background: #fafaf9; /*  stone-50 */
  font-family: "Iosevka Nerd Font", "Jetbrains Mono";
}
</style>
