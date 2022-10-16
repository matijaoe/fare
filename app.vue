<script setup>
useHead({
  title: 'FIRE',
  link: [
    { rel: 'icon', type: 'image/png', href: '/nuxt.png' },
  ],
})

useShortcuts()

await useFetch('/api/accounts/cash/balance', { key: 'balance' })
// await useFetch('/api/accounts/cash?transactions=false', { key: 'cash-accounts' })

// const cached = useFetchedPayload('cash-accounts')
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
/* TODO: what is css property for scrollbar to be over content so that it doesnt shift on overflow change? */
</style>

