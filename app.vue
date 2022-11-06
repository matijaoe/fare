<script setup>
useHead({
  title: 'FIRE',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' },
  ],
})

setupShortcuts()
</script>

<template>
  <NuxtLoadingIndicator />

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
@import url('https://fonts.cdnfonts.com/css/satoshi');
@import url('https://fonts.cdnfonts.com/css/khand');
@import url('https://cdnjs.cloudflare.com/ajax/libs/Iosevka/6.0.0/iosevka/iosevka.min.css');

body {
  accent-color: black;
}
/* scrollbar-gutter: stable; */
/* TODO: what is css property for scrollbar to be over content so that it doesnt shift on overflow change? */

html.dark {
  color-scheme: dark;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 150ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

