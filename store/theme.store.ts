import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TextCasing } from '~~/models/ui'

export const useTheme = defineStore('theme', () => {
  const textCasing = ref<TextCasing>('')

  return {
    textCasing,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTheme, import.meta.hot))
}
