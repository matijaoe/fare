<script lang="ts" setup>
import { useSession } from '#imports'

definePageMeta({
  layout: 'auth',
})

const { data, status, getCsrfToken, getProviders, signIn, signOut } = await useSession({ required: false })
const providers = await getProviders()
const csrfToken = await getCsrfToken()

const signOutHandler = () => {
  signOut({ callbackUrl: '/' })
}
</script>

<template>
  <div
    flex-1
    grid
    place-content-center
  >
    <div flex gap-2>
      <FButton v-if="data && status === 'authenticated'" @click="signOutHandler">
        logout
      </FButton>
      <FButton
        v-else
        @click="signIn('github', {
          callbackUrl: '/',
        })"
      >
        login with github
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
