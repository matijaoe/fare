import { TransactionType } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources'

type ActionType = 'create' | 'edit'

export const useTransactionModal = defineStore('modal-transaction', () => {
  // Modal type

  const modalType = ref<ActionType>('create')
  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Values
  const transactionId = ref<string>()

  // TODO:use zod instead of manually validating
  const validationSchema = toFormValidator(
    zod.object({
      type: zod.nativeEnum(TransactionType, { required_error: 'Type is required' }),
      // TODO: must be required but should be based off type
      fromAccountId: zod.any().optional(),
      toAccountId: zod.any().optional(),
      name: zod.string({ invalid_type_error: 'Name should be a string' }).trim().min(1, { message: 'Name is too short' }).max(24, { message: 'Name is too long' }).optional(),
      description: zod.null().optional().or(zod.string()),
      categoryId: zod.null().optional().or(zod.string()),
      amount: zod.number({ required_error: 'Amount is required' }).min(0.01, { message: 'Amount must be greater than 0' }),
      // TODO: dates suck!
      date: zod.date({ required_error: 'Date is required', invalid_type_error: 'Date is required' }),
    }))

  // TODO: handle from and to account via reactive validation schema

  const form = useForm<{
    type: TransactionType
    fromAccountId: string | null
    toAccountId: string | null
    name: string
    description: string | null | undefined
    categoryId: string | null
    amount: number
    date: Date
  }>({
    validationSchema,
  })

  // lame solution but will do for now, gotta replace with real veevalidate/zod solution
  const formValidBasedOnAccountIds = computed(() => {
    const { type, fromAccountId, toAccountId } = form.values
    if (type === 'Expense') {
      return !!fromAccountId
    }
    if (type === 'Income') {
      return !!toAccountId
    }
    if (type === 'Transfer') {
      return !!fromAccountId && !!toAccountId
    }
  })

  const isType = (t: TransactionType) => form.values.type === t

  const isExpense = computed(() => isType('Expense'))
  const isIncome = computed(() => isType('Income'))
  const isTransfer = computed(() => isType('Transfer'))

  useField<TransactionType>('type')
  useField<string | null>('fromAccountId')
  useField<string | null>('toAccountId')
  useField<string>('name')
  useField<string | null>('description')
  useField<string | null>('categoryId')
  useField<number>('amount')
  useField<Date>('date')

  const selectedTransactionType = computed(() => form.values.type)

  watch(selectedTransactionType, () => {
    if (isType('Transfer')) {
      form.setFieldValue('categoryId', null)
    } else if (isType('Expense')) {
      form.setFieldValue('toAccountId', null)
    } else if (isType('Income')) {
      form.setFieldValue('fromAccountId', null)
    }
  })

  // Modal state
  const open = ref(false)
  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditTransaction = (transaction: TransactionWithCategoryAndCashAccount) => {
    set(transactionId, transaction.id)

    form.setValues({
      type: transaction.type,
      fromAccountId: transaction.fromAccountId,
      toAccountId: transaction.toAccountId,
      name: transaction.name,
      description: transaction.description,
      categoryId: transaction.categoryId,
      amount: transaction.amount,
      date: new Date(transaction.date),
    })
  }

  const launchEdit = (transaction: TransactionWithCategoryAndCashAccount) => {
    set(modalType, 'edit')
    setEditTransaction(transaction)

    set(open, true)
  }

  const launchNew = (transactionType?: TransactionType) => {
    set(modalType, 'create')

    form.setFieldValue('type', transactionType ?? 'Expense')

    // TODO: set opening month view on date picker to current month

    set(open, true)
  }

  const reset = () => {
    // resetForm()
    form.resetForm()
    // TODO: is this needed
    // set(modalType, 'create')
    set(transactionId, undefined)
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
    transactionId,
    // Form
    form,
    reset,
    // TODO: temp solution
    formValidBasedOnAccountIds,
    // Transaction types
    isType,
    isExpense,
    isIncome,
    isTransfer,
    // Modal state
    opened,
    launchNew,
    launchEdit,
    hide,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionModal, import.meta.hot))
}
