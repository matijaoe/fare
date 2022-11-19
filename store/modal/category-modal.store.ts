import type { MoneyAccount } from '@prisma/client'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'

type ActionType = 'create' | 'edit'

export const useCategoryModal = defineStore('modal-category', () => {
  // Modal type
  const modalType = ref<ActionType>('create')
  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Modal state

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const launch = (account?: MoneyAccount) => {
    if (account) {
      set(modalType, 'edit')
    } else {
      set(modalType, 'create')
    }

    set(open, true)
  }

  const reset = () => {
    set(modalType, 'create')
  }

  const hide = () => {
    set(open, false)
    setTimeout(reset, 200)
  }

  return {
    // Modal type
    isEdit,
    isCreate,
    // Value for edit
    reset,
    showError,
    // Modal state
    opened,
    launch,
    hide,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryModal, import.meta.hot))
}
