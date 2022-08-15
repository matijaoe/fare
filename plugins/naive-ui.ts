import naive, { NButton } from 'naive-ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(naive)
  nuxtApp.vueApp.component('n-button', NButton)
})
