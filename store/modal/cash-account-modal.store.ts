import type { Account } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { get, set } from '@vueuse/core'
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
      name: zod.string().trim().min(1, { message: 'Name is required' }).max(24, { message: 'Name is too long' }),
      color: zod.any().optional(),
      icon: zod.any().optional(),
    }),
  )
  const form = useForm({
    validationSchema,
    initialValues: {
      name: '',
      icon: null,
      color: null,
    },
  })

  const { value: name, setValue: setName } = useField<string>('name')
  const { value: color, setValue: setColor } = useField<string | null>('color')
  const { value: icon, setValue: setIcon } = useField<string | null>('icon')

  // Defaults
  const colorDefault = {
    label: toTitleCase('green'),
    value: 'green',
    bg: 'bg-green-5',
    text: 'text-green-5',
  }

  // TODO: something aint right
  const iconDefault = {
    label: toTitleCase('wallet'),
    value: 'tabler:wallet',
  }

  // Select values

  const colorObject = computed({
    get: () => isDefined(color)
      ? {
          label: toTitleCase(color.value),
          value: color.value,
          bg: `bg-${color.value}-5`,
          text: `text-${color.value}-5`,
        }
      : null,
    set: obj => setColor(obj?.value ?? null),
  })

  const iconObject = computed({
    get: () => isDefined(icon)
      ? {
          label: toTitleCase(icon.value?.split(':').at(-1) || 'None'),
          value: icon.value,
        }
      : null,
    set: obj => setIcon(obj?.value ?? null),
  })

  // Modal steta

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditAccount = (account: Account) => {
    set(accountId, account.id)

    setName(account.name)
    setColor(account.color)
    setIcon(account.icon)
  }

  const launch = (account?: Account) => {
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
    // Values
    name,
    color,
    icon,

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
