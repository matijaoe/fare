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
  <ModalGlobalModals />

  <div
    font="sans"
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
body {
  accent-color: black;
}
/* scrollbar-gutter: stable; */
/* TODO: what is css property for scrollbar to be over content so that it doesnt shift on overflow change? */
</style>

