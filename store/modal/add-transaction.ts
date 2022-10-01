import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { TransactionType } from '@prisma/client'

export const useNewTransactionModal = defineStore('modal-new-transaction', () => {
  const transactionType = ref<TransactionType>()
  const setTransactionType = (type: TransactionType) => set(transactionType, type)

  const open = ref(false)
  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const launch = (type?: TransactionType) => {
    if (type) {
      set(transactionType, type)
    }
    set(open, true)
  }

  const hide = () => set(open, false)

  return {
    opened,
    launch,
    hide,
    transactionType,
    setTransactionType,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useNewTransactionModal, import.meta.hot))
}
