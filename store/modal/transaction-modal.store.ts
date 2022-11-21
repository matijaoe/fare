import type { Category, Prisma, TransactionType } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { format } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CashAccountWithAccount } from '~~/models/resources/account'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transaction'
import type { SelectItem } from '~~/models/ui'

type ActionType = 'create' | 'edit'

export const useTransactionModal = defineStore('modal-transaction', () => {
  // Modal type

  const modalType = ref<ActionType>('create')
  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Values
  const transactionId = ref<string>()

  const name = ref<string>('')
  const description = ref<string>('')
  const amount = ref<number>()
  const category = ref<Category>()
  const date = ref<string>()
  const fromAccount = ref<CashAccountWithAccount>()
  const toAccount = ref<CashAccountWithAccount>()

  const selectedCategory = computed({
    get: () => isDefined(category)
      ? { ...get(category), label: get(category).name, value: get(category).id }
      : undefined,
    set: (item?: SelectItem<Category>) => set(category, item),
  })

  const selectedFromAccount = computed({
    get: () => isDefined(fromAccount)
      ? { ...get(fromAccount.value), label: get(fromAccount.value).account.name, value: get(fromAccount.value).id }
      : undefined,
    set: (item?: SelectItem<CashAccountWithAccount>) => set(fromAccount, item),
  })

  const selectedToAccount = computed({
    get: () => isDefined(toAccount)
      ? { ...get(toAccount.value), label: get(toAccount.value).account.name, value: get(toAccount.value).id }
      : undefined,
    set: (item?: SelectItem<CashAccountWithAccount>) => set(toAccount, item),
  })

  // Transaction type
  const type = ref<TransactionType>('Expense')

  const isType = (t: TransactionType) => get(type) === t

  const isExpense = computed(() => isType('Expense'))
  const isIncome = computed(() => isType('Income'))
  const isTransfer = computed(() => isType('Transfer'))

  watch(type, () => {
    if (isType('Transfer')) {
      set(category, undefined)
    } else if (isType('Expense')) {
      set(toAccount, undefined)
    } else if (isType('Income')) {
      set(fromAccount, undefined)
    }
  })

  // Form

  // TODO: add validaton, currenly breaks if account not defined
  const form = computed<Partial<Prisma.TransactionUncheckedCreateWithoutUserInput>>(() => ({
    type: get(type),
    name: get(name),
    description: get(description),
    amount: get(amount),
    date: isDefined(date) ? new Date(get(date)).toISOString() : undefined,
    categoryId: get(category)?.id,
    fromAccountId: get(fromAccount)?.id,
    toAccountId: get(toAccount)?.id,
  }))

  // lame solution but will do for now, gotta replace with real veevalidate/zod solution
  const formValid = computed(() => {
    const { type, amount, date, fromAccountId, toAccountId } = form.value
    if (!type) {
      return false
    }
    if (!amount || amount <= 0 || !date) {
      return false
    }
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

  const resetForm = () => {
    set(name, '')
    set(description, '')
    set(amount, undefined)
    set(date, format(new Date(), 'yyyy-MM-dd'))
    set(category, undefined)
    set(fromAccount, undefined)
    set(toAccount, undefined)
  }

  // Modal state
  const open = ref(false)
  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditTransaction = (transaction: TransactionWithCategoryAndCashAccount) => {
    set(transactionId, transaction.id)

    set(type, transaction.type)
    set(name, transaction.name)
    set(description, transaction.description)
    set(amount, transaction.amount)
    set(date, format(new Date(transaction.date), 'yyyy-MM-dd'))
    set(category, transaction.category)
    set(fromAccount, transaction.fromAccount)
    set(toAccount, transaction.toAccount)
  }

  const launchEdit = (transaction: TransactionWithCategoryAndCashAccount) => {
    set(modalType, 'edit')
    setEditTransaction(transaction)

    set(open, true)
  }

  const launchNew = (transactionType?: TransactionType) => {
    set(modalType, 'create')

    set(type, transactionType ?? 'Expense')

    set(open, true)
  }

  const reset = () => {
    resetForm()
    set(type, 'create')
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
    // Values
    type,
    name,
    description,
    amount,
    date,
    category,
    fromAccount,
    toAccount,
    // Select values
    selectedCategory,
    selectedFromAccount,
    selectedToAccount,
    // Form
    form,
    formValid,
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
