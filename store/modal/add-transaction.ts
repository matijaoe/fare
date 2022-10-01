import { acceptHMRUpdate, defineStore } from 'pinia'
import { get, set } from '@vueuse/core'
import type { Prisma, TransactionType } from '@prisma/client'

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

  const form = reactive<Prisma.TransactionUncheckedCreateWithoutUserInput>({
    type: 'Expense',
    name: '',
    description: '',
    amount: 0,
    date: new Date(),
    categoryId: null,
    fromAccountId: null,
  })

  const setType = (type: TransactionType) => form.type = type

  const isType = (type: TransactionType) => form.type === type

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
    // Form
    categoryOptions,
    fromAccountsOptions,
    form,
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
