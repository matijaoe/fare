import type { Category, Prisma, TransactionType } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CashAccountWithAccount } from '~~/models/resources/account'

export const useAddTransactionModal = defineStore('modal-new-transaction', () => {
  // Form
  const { data: categories } = useCategories()
  const { data: accounts } = useCashAccounts({ transactions: 'false' })

  const categoryOptions = computed(() => get(categories)?.map(category => ({
    ...category,
    label: category.name,
    value: category.id,
  })) ?? [])

  const fromAccountsOptions = computed(() => get(accounts)?.map(cashAccount => ({
    ...cashAccount,
    label: cashAccount.account.name,
    value: cashAccount.id,
  })) ?? [])

  // Values

  const type = ref<TransactionType>('Expense')
  const name = ref<string>('')
  const description = ref<string>('')
  const amount = ref<number>()
  const category = ref<Category>()
  const date = ref<Date>(new Date())
  const fromAccount = ref<CashAccountWithAccount>()
  const toAccount = ref<CashAccountWithAccount>()

  const form = computed<Partial<Prisma.TransactionUncheckedCreateWithoutUserInput>>(() => ({
    type: get(type),
    name: get(name),
    description: get(description),
    amount: get(amount),
    date: get(date),
    categoryId: get(category)?.id,
    fromAccountId: get(fromAccount)?.id,
    toAccountId: get(toAccount)?.id,
  }))

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

  const hide = () => set(open, false)

  return {
    // Values
    type,
    name,
    description,
    amount,
    category,
    fromAccount,
    // Form
    form,
    // Options
    categoryOptions,
    fromAccountsOptions,
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
