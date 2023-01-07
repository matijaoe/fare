export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    '@sidebase/nuxt-auth',
  ],
  experimental: {
    reactivityTransform: true,
  },
  unocss: {
    uno: true,
    attributify: true,
    preflight: true,
    icons: false,
  },
  colorMode: {
    classSuffix: '',
    preference: 'light',
    fallback: 'light',
  },
  vue: {
    compilerOptions: {
      comments: false,
    },
  },
  css: [
    '~/assets/styles/floating-vue.css',
  ],
  imports: {
    dirs: [
      'composables/**',
      'store/**',
    ],
  },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  auth: {
    origin: process.env.ORIGIN,
    enableGlobalAppMiddleware: true,
  },
  runtimeConfig: {
    authSecret: process.env.AUTH_SECRET,
    githubClientId: process.env.GITHUB_CLIENT_ID,
    githubClientSecret: process.env.GITHUB_CLIENT_SECRET,
    googleClientId: process.env.GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  },
})
