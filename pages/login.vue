<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const { signIn, getProviders } = await useAuth()
const providers = await getProviders()

const signInHandler = async (provider: string) => {
  const res = await signIn(provider, { callbackUrl: '/', redirect: false })
  console.log('res :>> ', res)
}

// TODO on register, it logs in but doesnt automatixally redirect to page, only on second login
type ProviderId = 'github' | 'google'
const providerIcons: Record<ProviderId, string> = {
  github: 'tabler:brand-github',
  google: 'tabler:brand-google',
}
</script>

<template>
  <div
    flex-1
    grid
    place-content-center
  >
    <pre>{{ providers }}</pre>
    <div flex gap-2>
      <FButton
        v-for="provider in providers"
        :key="provider.id"
        :icon="providerIcons[provider.id as ProviderId]"
        icon-placement="right"
        @click="signInHandler(provider.id)"
      >
        Sign in with {{ provider.name }}
      </FButton>

      <FButton variant="info" @click="navigateTo('/')">
        Home
      </FButton>
      <FButton variant="warning" @click="navigateTo('/transactions')">
        Transactions
      </FButton>
    </div>
  </div>
</template>

<style scoped>
pre {
  @apply bg-gray-800 text-white p-3 my-3 rounded shadow overflow-x-auto;
}

pre span {
  @apply text-green-400;
}
</style>
