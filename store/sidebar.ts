import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'

export const useSidebar = defineStore('user', () => {
  const isOpen = ref(false)
  const toggle = () => set(isOpen, !isOpen.value)
  const open = () => set(isOpen, true)
  const close = () => set(isOpen, false)

  return {
    isOpen,
    toggle,
    open,
    close,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebar, import.meta.hot))
}
