<script setup>
import '@fontsource/iosevka'

useHead({
  title: 'FARE',
  link: [
    { rel: 'icon', href: 'https://favicones.vercel.app/api/fluent-emoji-flat:hand-with-index-finger-and-thumb-crossed-medium-light' },
  ],
})

setupShortcuts()

const fireConfig = useFireConfig()
const { userId } = await useAuth()
watchEffect(() => {
  if (userId.value) {
    fireConfig.setUserId(userId.value)
  }
})
</script>

<template>
  <NuxtLoadingIndicator :height="2" />

  <ModalGlobalModals />

  <div
    font="sans"
    h-screen w-screen overflow-hidden
    class="bg-base color-base"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/khand');

body {
  accent-color: black;
}
/* scrollbar-gutter: stable; */
/* TODO: what is css property for scrollbar to be over content so that it doesnt shift on overflow change? */

html.dark {
  color-scheme: dark;
}
</style>

