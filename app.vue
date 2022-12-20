<script setup>
import '@fontsource/iosevka'

useHead({
  title: 'FARE',
  link: [
    { rel: 'icon', href: 'https://favicones.vercel.app/api/fluent-emoji-flat:hand-with-index-finger-and-thumb-crossed-medium-light' },
  ],
})

setupShortcuts()

const fireConfigStore = useFireConfigStore()
const { userId } = $(useAuth())
watchEffect(() => {
  if (userId) {
    fireConfigStore.setUserId(userId)
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

html.dark {
  color-scheme: dark;
}
</style>

