import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(FloatingVue, {
    themes: {
      'info-tooltip': {
        $extend: 'tooltip',
        $resetCss: true,
      },
    },
  })
})
