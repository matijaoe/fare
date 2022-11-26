import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import type { InvestmentAccountWithAccount } from '~~/models/resources'
import { toTitleCase } from '~~/utils'

type ActionType = 'create' | 'edit'

export const useInvestmentAccountModal = defineStore('modal-investment-account', () => {
  // Modal type
  const modalType = ref<ActionType>('create')
  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Values
  const _accountId = ref<string>()
  const _investmentAccountId = ref<string>()

  const validationSchema = toFormValidator(
    zod.object({
      name: zod.string({ required_error: 'Name is required' }).trim().min(1, { message: 'Name is required' }).max(24, { message: 'Name is too long' }),
      color: zod.any().optional(),
      icon: zod.any().optional(),
      description: zod.any().optional(),
      expectedRateOfReturn: zod.number({ required_error: 'Rate of return is required', invalid_type_error: 'Rate of return is required' }).min(0.1, { message: 'Expected rate of return must be greater than 0' }),
      // TODO: handle enums
      // type: zod.string(),
    }),
  )

  const form = useForm<{
    name: string
    color: string | null
    icon: string | null
    description: string | null
    expectedRateOfReturn: number
    // type: InvestmentType
  }>({
    validationSchema,
  })

  useField<string>('name')
  useField<string | null>('description')
  useField<number>('expectedRateOfReturn')
  // useField<string>('type')
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

  const setEditAccount = (account: InvestmentAccountWithAccount) => {
    // TODO: add type
    const { description, expectedRateOfReturn, id: investmentAccountId } = account
    const { id, name, color, icon } = account.account
    set(_accountId, id)
    set(_investmentAccountId, investmentAccountId)

    form.setValues({ name, color, icon, description, expectedRateOfReturn })
  }

  const launch = (account?: InvestmentAccountWithAccount) => {
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
    set(_accountId, undefined)
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
    accountId: _accountId,
    investmentAccountId: _investmentAccountId,
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
  import.meta.hot.accept(acceptHMRUpdate(useInvestmentAccountModal, import.meta.hot))
}
