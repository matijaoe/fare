import type { Prisma } from '@prisma/client'
import { get } from '@vueuse/core'
import { toTitleCase } from '~~/utils'

export const useCashAccountForm = () => {
  const modal = useCashAccountModal()
  const form = $computed(() => modal.form)

  const { mutate: createAccount, isLoading: isCreateLoading } = useCashAccountCreate()
  const { mutate: updateAccount, isLoading: isUpdateLoading } = useAccountUpdate(toRef(modal, 'accountId'))
  const { mutate: deleteAccount, isLoading: isDeleteLoading } = useAccountDelete(toRef(modal, 'accountId'))

  const loading = computed(() => get(isCreateLoading) || get(isUpdateLoading))

  const brandIcons = [
    { label: 'Revolut', value: 'simple-icons:revolut' },
    { label: 'Wise', value: 'simple-icons:wise' },
    { label: 'Monzo', value: 'simple-icons:monzo' },
    { label: 'N26', value: 'simple-icons:n26' },
    { label: 'Cashapp', value: 'simple-icons:cashapp' },
    { label: 'Bitcoin', value: 'simple-icons:bitcoin' },
    { label: 'Nubank', value: 'simple-icons:nubank' },
    { label: 'Starling Bank', value: 'simple-icons:starlingbank' },
    { label: 'Bank of America', value: 'simple-icons:bankofamerica' },
    { label: 'Deutsche Bank', value: 'simple-icons:deutschebank' },
    { label: 'Binance', value: 'simple-icons:binance' },
  ]

  const generalIcons = [
    { label: 'Wallet', value: 'tabler:wallet' },
    { label: 'Report', value: 'tabler:report-money' },
    { label: 'Moneybag', value: 'tabler:moneybag' },
    { label: 'Home dollar', value: 'tabler:home-dollar' },
    { label: 'Cash', value: 'tabler:cash' },
    { label: 'Banknote', value: 'tabler:cash-banknote' },
    { label: 'Bank', value: 'tabler:building-bank' },
    { label: 'Mastercard', value: 'tabler:brand-mastercard' },
    { label: 'Visa', value: 'tabler:brand-visa' },
    { label: 'Dollar coin', value: 'tabler:coin' },
    { label: 'Bitcoin coin', value: 'tabler:coin-bitcoin' },
    { label: 'Euro coin', value: 'tabler:coin-euro' },
    { label: 'Pound coin', value: 'tabler:coin-pound' },
    { label: 'Cookie', value: 'tabler:cookie' },
    { label: 'Walk', value: 'tabler:walk' },
  ]

  const icons = ref([
    ...generalIcons,
    ...brandIcons,
  ])

  const colors = ref([
    {
      label: toTitleCase('red'),
      value: 'red',
      bg: 'bg-red-5',
      text: 'text-red-5',
    },
    {
      label: toTitleCase('orange'),
      value: 'orange',
      bg: 'bg-orange-5',
      text: 'text-orange-5',
    },
    {
      label: toTitleCase('amber'),
      value: 'amber',
      bg: 'bg-amber-5',
      text: 'text-amber-5',
    },
    {
      label: toTitleCase('yellow'),
      value: 'yellow',
      bg: 'bg-yellow-5',
      text: 'text-yellow-5',
    },
    {
      label: toTitleCase('lime'),
      value: 'lime',
      bg: 'bg-lime-5',
      text: 'text-lime-5',
    },
    {
      label: toTitleCase('green'),
      value: 'green',
      bg: 'bg-green-5',
      text: 'text-green-5',
    },
    {
      label: toTitleCase('emerald'),
      value: 'emerald',
      bg: 'bg-emerald-5',
      text: 'text-emerald-5',
    },
    {
      label: toTitleCase('teal'),
      value: 'teal',
      bg: 'bg-teal-5',
      text: 'text-teal-5',
    },
    {
      label: toTitleCase('cyan'),
      value: 'cyan',
      bg: 'bg-cyan-5',
      text: 'text-cyan-5',
    },
    {
      label: toTitleCase('sky'),
      value: 'sky',
      bg: 'bg-sky-5',
      text: 'text-sky-5',
    },
    {
      label: toTitleCase('blue'),
      value: 'blue',
      bg: 'bg-blue-5',
      text: 'text-blue-5',
    },
    {
      label: toTitleCase('indigo'),
      value: 'indigo',
      bg: 'bg-indigo-5',
      text: 'text-indigo-5',
    },
    {
      label: toTitleCase('violet'),
      value: 'violet',
      bg: 'bg-violet-5',
      text: 'text-violet-5',
    },
    {
      label: toTitleCase('purple'),
      value: 'purple',
      bg: 'bg-purple-5',
      text: 'text-purple-5',
    },
    {
      label: toTitleCase('fuchsia'),
      value: 'fuchsia',
      bg: 'bg-fuchsia-5',
      text: 'text-fuchsia-5',
    },
    {
      label: toTitleCase('pink'),
      value: 'pink',
      bg: 'bg-pink-5',
      text: 'text-pink-5',
    },
    {
      label: toTitleCase('gray'),
      value: 'gray',
      bg: 'bg-gray-5',
      text: 'text-gray-5',
    },
  ])

  const createAccountHandler = (values: Prisma.AccountCreateWithoutUserInput) => {
    createAccount(values, {
      onSuccess: () => {
        modal.hide()
        form.resetForm()
      },
    })
  }

  const editAccountHandler = (values: Prisma.AccountUpdateWithoutUserInput) => {
    updateAccount(values, {
      onSuccess: () => {
        modal.hide()
        form.resetForm()
      },
    })
  }

  const deleteAccountHandler = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        modal.hide()
        form.resetForm()
      },
    })
  }

  const onSubmit = form.handleSubmit((values) => {
    if (modal.isEdit) {
      console.log(modal.type)
      editAccountHandler(values)
    } else {
      console.log(modal.type)
      createAccountHandler(values)
    }
  })

  return {
    // Loading states
    loading,
    isCreateLoading,
    isUpdateLoading,
    isDeleteLoading,
    // Select options
    icons,
    colors,
    // Form actions
    onSubmit,
    deleteAccount: deleteAccountHandler,
    form,
    modal,
  }
}
