import type { Category, Prisma, TransactionType } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { format } from 'date-fns'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CashAccountWithAccount } from '~~/models/resources/account'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transactions'
import type { SelectItem } from '~~/models/ui'

type ActionType = 'create' | 'edit'

export const useTransactionModal = defineStore('modal-transaction', () => {
  // Modal type

  const modalType = ref<ActionType>('create')
  const setModalType = (t: ActionType) => set(modalType, t)

  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Values

  const name = ref<string>('')
  const description = ref<string>('')
  const amount = ref<number>()
  const category = ref<Category>()
  const date = ref<string>(format(new Date(), 'yyyy-MM-dd'))
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

  // Type
  const type = ref<TransactionType>('Expense')

  const setType = (t: TransactionType) => set(type, t)
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

  const form = computed<Partial<Prisma.TransactionUncheckedCreateWithoutUserInput>>(() => ({
    type: get(type),
    name: get(name),
    description: get(description),
    amount: get(amount),
    date: get(date) ? new Date(get(date)).toISOString() : undefined,
    categoryId: get(category)?.id,
    fromAccountId: get(fromAccount)?.id,
    toAccountId: get(toAccount)?.id,
  }))

  const clearForm = () => {
    set(type, 'Expense')
    set(name, '')
    set(description, '')
    set(amount, undefined)
    set(date, format(new Date(), 'yyyy-MM-dd'))
    set(category, undefined)
    set(fromAccount, undefined)
    set(toAccount, undefined)
  }

  // Modal
  const open = ref(false)
  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const launchEdit = (transaction: TransactionWithCategoryAndCashAccount) => {
    setModalType('edit')

    set(type, transaction.type)
    set(name, transaction.name)
    set(description, transaction.description)
    set(amount, transaction.amount)
    set(date, format(new Date(transaction.date), 'yyyy-MM-dd'))
    set(category, transaction.category)
    set(fromAccount, transaction.fromAccount)
    set(toAccount, transaction.toAccount)

    set(open, true)
  }

  const launchNew = (type?: TransactionType) => {
    setModalType('create')
    setType(type ?? 'Expense')
    set(open, true)
  }

  const hide = () => {
    set(open, false)
    clearForm()
  }

  return {
    modalType,
    isEdit,
    isCreate,
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
    clearForm,
    // Options
    isType,
    isExpense,
    isIncome,
    isTransfer,
    // modal
    opened,
    launchNew,
    launchEdit,
    hide,
    setType,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useTransactionModal, import.meta.hot))
}
