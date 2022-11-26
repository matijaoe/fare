import { InvestmentType } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import type { InvestmentAccountWithAccount } from '~~/models/resources'

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
      color: zod.null().optional().or(zod.string()),
      icon: zod.null().optional().or(zod.string()),
      description: zod.null().optional().or(zod.string()),
      expectedRateOfReturn: zod.number({ required_error: 'Rate of return is required', invalid_type_error: 'Rate of return is required' }).min(0.1, { message: 'Expected rate of return must be greater than 0' }),
      type: zod.nativeEnum(InvestmentType, { required_error: 'Type is required' }),
    }),
  )

  const form = useForm<{
    name: string
    color: string | undefined
    icon: string | undefined
    description: string | undefined
    expectedRateOfReturn: number | undefined
    type: InvestmentType | undefined
  }>({
    validationSchema,
  })

  useField<string>('name')
  useField<string | null>('description')
  useField<number>('expectedRateOfReturn')
  useField<InvestmentType>('type')
  useField<string | null>('color')
  useField<string | null>('icon')

  // Modal state

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditAccount = (account: InvestmentAccountWithAccount) => {
    const { description, expectedRateOfReturn, type, id: investmentAccountId } = account
    const { id, name, color, icon } = account.account
    set(_accountId, id)
    set(_investmentAccountId, investmentAccountId)

    form.setValues({ name, color, icon, description, expectedRateOfReturn, type })
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
    // TODO: didnt reset name
    form.resetForm()
    set(modalType, 'create')
    set(_accountId, undefined)
    set(_investmentAccountId, undefined)
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
