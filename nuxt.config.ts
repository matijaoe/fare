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
    viteNode: false,
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
  // https://github.com/nuxt/framework/issues/6204#issuecomment-1201398080
  hooks: {
    'vite:extendConfig': function (config: any, { isServer }: any) {
      if (isServer) {
        // Workaround for netlify issue
        // https://github.com/nuxt/framework/issues/6204
        config.build.rollupOptions.output.inlineDynamicImports = true
      }
    },
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
})
