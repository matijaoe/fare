import type { MoneyAccount } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'

type ActionType = 'create' | 'edit'

export const useCashAccountModal = defineStore('modal-account', () => {
  // Modal type
  const modalType = ref<ActionType>('create')
  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Values
  const accountId = ref<string>()

  const validationSchema = toFormValidator(
    zod.object({
      name: zod.string({ required_error: 'Name is required' }).trim().min(1, { message: 'Name is required' }).max(24, { message: 'Name is too long' }),
      color: zod.null().or(zod.string()).optional(),
      icon: zod.null().or(zod.string()).optional(),
    }),
  )

  const form = useForm<{
    name: string
    color: string | null
    icon: string | null
  }>({
    validationSchema,
  })

  useField<string>('name')
  useField<string | null>('color')
  useField<string | null>('icon')

  // Modal state

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditAccount = (account: MoneyAccount) => {
    const { id, name, color, icon } = account
    set(accountId, id)

    form.setValues({ name, color, icon })
  }

  const launch = (account?: MoneyAccount) => {
    if (account) {
      setEditAccount(account)
      set(modalType, 'edit')
    } else {
      set(modalType, 'create')
    }

    set(open, true)
  }

  const reset = () => {
    form.resetForm()
    set(modalType, 'create')
    set(accountId, undefined)
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
    accountId,
    // Form
    form,
    reset,
    showError,
    // Modal state
    opened,
    launch,
    hide,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCashAccountModal, import.meta.hot))
}
