import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import { useBreakpoints } from '~~/composables/breakpoints'

export const useSidebar = defineStore('sidebar', () => {
  const { mdDown } = useBreakpoints()

  const isOpen = ref(!mdDown.value)

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
