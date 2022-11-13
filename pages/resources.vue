<script lang="ts" setup>
import { useQueryClient } from '@tanstack/vue-query'
import { useSession } from '#imports'

const { data, status, getCsrfToken, getProviders, signIn, signOut } = await useSession({ required: false })
const providers = await getProviders()
const csrfToken = await getCsrfToken()

const qc = useQueryClient()
const signOutHandler = () => {
  qc.clear()
  signOut({ callbackUrl: '/' })
}
</script>

<template>
  <LayoutPageLayout>
    <div class="px-5">
      <h3 class="text-xl font-bold ">
        Authentication Overview
      </h3>
      <p class="text-sm">
        See all available authentication & session information below.
      </p>
      <pre v-if="status"><span>Status:</span> {{ status }}</pre>
      <pre v-if="data"><span>Data:</span> {{ data }}</pre>
      <pre v-if="csrfToken"><span>CSRF Token:</span> {{ csrfToken }}</pre>
      <pre v-if="providers"><span>Providers:</span> {{ providers }}</pre>

      <FButton v-if="data && status === 'authenticated'" @click="signOutHandler">
        logout
      </FButton>
      <FButton
        v-else
        @click="signIn('github', {
          callbackUrl: '/',
        })"
      >
        login
      </FButton>
    </div>
  </LayoutPageLayout>
</template>

<style scoped>
pre {
  @apply bg-gray-800 text-white p-3 my-3 rounded shadow overflow-x-auto;
}

pre span {
  @apply text-green-400;
}
</style>
