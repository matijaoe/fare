import type { Account } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import { toTitleCase } from '~~/utils'

type ActionType = 'create' | 'edit'

export const useCashAccountModal = defineStore('modal-account', () => {
  const type = ref<ActionType>('create')

  const $account = ref<Account>()
  const accountId = computed(() => $account.value?.id)

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
    initialErrors: {
      name: '',
      icon: '',
      color: '',
    },
  })

  const { value: name, setValue: setName } = useField<string>('name')
  const { value: color, setValue: setColor } = useField<string | null>('color')
  const { value: icon, setValue: setIcon } = useField<string | null>('icon')

  const colorDefault = {
    label: toTitleCase('gray'),
    value: 'gray',
    bg: 'bg-gray-5',
    text: 'text-gray-5',
  }

  const colorObject = computed({
    get: () => isDefined(color)
      ? {
          label: toTitleCase(color.value),
          value: color.value,
          bg: `bg-${color.value}-5`,
          text: `text-${color.value}-5`,
        }
      : undefined,
    set: obj => setColor(obj?.value ?? null),
  })

  if (!isDefined(color)) {
    colorObject.value = { ...colorDefault }
  }

  const iconObject = computed({
    get: () => isDefined(icon)
      ? {
          label: toTitleCase(icon.value?.split(':').at(-1) || 'None'),
          value: icon.value,
        }
      : undefined,
    set: obj => setIcon(obj?.value ?? null),
  })

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditAccount = (account: Account) => {
    set($account, account)
    set(type, 'edit')

    setName(account.name)
    setColor(account.color)
    setIcon(account.icon)
  }

  const launch = (account?: Account) => {
    set(open, true)

    if (account) {
      setEditAccount(account)
    } else {
      set(type, 'create')
    }
  }

  const reset = () => {
    form.resetForm()
    set(type, 'create')
  }

  const hide = (cb?: () => void) => {
    set(open, false)

    setTimeout(() => {
      reset()
      cb?.()
    }, 200)
  }

  const isEdit = computed(() => type.value === 'edit')
  const isCreate = computed(() => type.value === 'create')

  return {
    type,
    isEdit,
    isCreate,
    opened,
    launch,
    hide,
    name,
    color,
    colorObject,
    iconObject,
    icon,
    form,
    account: $account,
    accountId,
    showError,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCashAccountModal, import.meta.hot))
}
