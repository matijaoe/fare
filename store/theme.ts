import { acceptHMRUpdate, defineStore } from 'pinia'
import type { TextCasing } from '~~/models/theme'

export const useTheme = defineStore('theme', () => {
  const textCasing = ref<TextCasing>('none')

  return {
    textCasing,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTheme, import.meta.hot))
}
