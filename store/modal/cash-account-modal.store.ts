import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'

export const useCashAccountModal = defineStore('modal-cash-account', () => {
  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const launch = () => {
    set(open, true)
  }

  const hide = () => {
    set(open, false)
  }

  return {
    opened,
    launch,
    hide,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCashAccountModal, import.meta.hot))
}
