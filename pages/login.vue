<script lang="ts" setup>
definePageMeta({
  layout: 'auth',
  auth: false,
})

useHead({
  title: 'Login',
})

const { signIn, getProviders, isAuthenticated } = useAuth()
const providers = await getProviders()

const signInHandler = async (provider: string) => {
  await signIn(provider, { callbackUrl: '/', redirect: false })
}

type ProviderId = 'github' | 'google'

const providerButtons: Record<ProviderId, { icon: string; class?: string | string[] }> = {
  github: {
    icon: 'mdi:github',
    class: 'bg-#171516 text-white',
  },
  google: {
    icon: 'mdi:google',
    class: 'bg-#4285F4 text-white',
  },
}

whenever(isAuthenticated, () => {
  navigateTo('/')
}, { immediate: true })
</script>

<template>
  <div class="auth-wrapper" />
  <div z-2 flex flex-col items-center flex-1 py-10>
    <FLogo class="z-2" size="lg" darker />

    <div
      v-if="providers"
      flex-1 grid place-content-center
    >
      <div flex flex-col gap-2>
        <template
          v-for="[key, value] in Object.entries(providers) "
          :key="key"
        >
          <FButton
            v-if="value"
            variant="empty"
            size="lg"
            class="!pl-7"
            :class="providerButtons[key as ProviderId].class"
            @click="signInHandler(key)"
          >
            <div flex items-center justify-start gap-3>
              <Icon :name="providerButtons[key as ProviderId].icon" text-xl />
              <p>Sign in with {{ value.name }}</p>
            </div>
          </FButton>
        </template>
      </div>
    </div>

    <p font-medium text-2xl mt-auto>
      Plan for your future, today.
    </p>
  </div>
</template>

<style scoped>
.auth-wrapper {
  position: fixed;
  inset: 0;
  z-index: 1;

  --bg: #fafaf9;
  background-color: var(--bg);
  background-image: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23e7e5e4' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}

.auth-wrapper::before {
  content: '';
  position: fixed;
  inset: 0;
  z-index: -1;
  background: linear-gradient(transparent 25%, var(--bg) 50%);
  background-size: 100% 200%;
  animation: fade-in-grid 0.8s linear forwards;
}

@keyframes fade-in-grid {
  from {
    background-position-y: 60%;
  }

  to {
    background-position-y: 0%;
  }
}
</style>
