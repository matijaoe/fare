import type { Category, Prisma, TransactionType } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { format } from 'date-fns'
import type { CashAccountWithAccount } from '~~/models/resources/account'

export const useAddTransactionModal = defineStore('modal-new-transaction', () => {
  // Form
  const { data: categories } = useCategories()
  const { data: accounts } = useCashAccounts({ transactions: 'false' })

  // Values

  const type = ref<TransactionType>('Expense')
  const name = ref<string>('')
  const description = ref<string>('')
  const amount = ref<number>()
  const category = ref<Category>()
  const date = ref<string>(format(new Date(), 'yyyy-MM-dd'))
  const fromAccount = ref<CashAccountWithAccount>()
  const toAccount = ref<CashAccountWithAccount>()

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

  const categoryOptions = computed(() => get(categories)?.map(category => ({
    ...category,
    label: category.name,
    value: category.id,
  })) ?? [])

  const accountOptions = computed(() => get(accounts)?.map(cashAccount => ({
    ...cashAccount,
    label: cashAccount.account.name,
    value: cashAccount.id,
  })) ?? [])

  const fromAccountOptions = computed(() => get(accountOptions).filter(acc => acc.id !== form.value.toAccountId) ?? [])
  const toAccountOptions = computed(() => get(accountOptions).filter(acc => acc.id !== form.value.fromAccountId) ?? [])

  const setType = (t: TransactionType) => set(type, t)
  const isType = (t: TransactionType) => get(type) === t

  // Modal
  const open = ref(false)
  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const launch = (type?: TransactionType) => {
    if (type) {
      setType('Expense')
    }
    set(open, true)
  }

  const hide = () => {
    set(open, false)
    clearForm()
  }

  watch(type, () => {
    if (isType('Transfer')) {
      set(category, undefined)
    } else if (isType('Expense')) {
      set(toAccount, undefined)
    } else if (isType('Income')) {
      set(fromAccount, undefined)
    }
  })

  return {
    // Values
    type,
    name,
    description,
    amount,
    date,
    category,
    fromAccount,
    toAccount,
    // Form
    form,
    clearForm,
    // Options
    categoryOptions,
    fromAccountOptions,
    toAccountOptions,
    isType,
    // modal
    opened,
    launch,
    hide,
    setType,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAddTransactionModal, import.meta.hot))
}
