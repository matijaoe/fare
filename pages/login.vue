<script lang="ts" setup>
import { useSession } from '#imports'

definePageMeta({
  layout: 'auth',
})

const { data, status, isLoading, isAuthenticated, signIn, signOut } = await useAuth()
const signOutHandler = () => {
  signOut({ callbackUrl: '/login' })
}
</script>

<template>
  <div
    flex-1
    grid
    place-content-center
  >
    <div flex gap-2>
      <FButton v-if="isAuthenticated" @click="signOutHandler">
        logout
      </FButton>
      <FButton
        v-else
        :loading="isLoading"
        @click="signIn('github', { callbackUrl: '/' })"
      >
        login with github
      </FButton>

      <FButton variant="info" @click="navigateTo('/')">
        Home
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
