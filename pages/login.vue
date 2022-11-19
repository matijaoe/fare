<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
})

const { status, signIn, signOut } = await useSession({ required: false })

const signInHandler = async () => {
  signIn('github', { callbackUrl: '/' })
}
</script>

<template>
  <div
    flex-1
    grid
    place-content-center
  >
    <div flex gap-2>
      <FButton @click="signInHandler">
        login with github
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
