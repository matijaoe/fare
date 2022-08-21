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
    bg="stone-1"
    text="stone-9 lg"
    min-h="screen"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: "Iosevka Nerd Font", "Jetbrains Mono";
  font-weight: 500;
}

/* html.dark {
  background: #100800;
  color: FFFAF6;
} */
</style>
