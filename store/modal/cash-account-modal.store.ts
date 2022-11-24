import type { MoneyAccount } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import { toTitleCase } from '~~/utils'

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
      color: zod.any().optional(),
      icon: zod.any().optional(),
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

  // Select values

  const colorObject = computed({
    get: () => form.values.color
      ? {
          label: toTitleCase(form.values.color),
          value: form.values.color,
          bg: `bg-${form.values.color}-5`,
          text: `text-${form.values.color}-5`,
        }
      : null,
    set: obj => form.setFieldValue('color', obj?.value ?? null),
  })

  const iconObject = computed({
    get: () => form.values.icon
      ? {
          label: toTitleCase(form.values.icon?.split(':').at(-1) || 'None'),
          value: form.values.icon,
        }
      : null,
    set: obj => form.setFieldValue('icon', obj?.value ?? null),
  })

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
    // Select item value
    colorObject,
    iconObject,
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
