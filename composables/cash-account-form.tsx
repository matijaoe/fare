import type { Prisma } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { toTitleCase } from '~~/utils'

const colors = [
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
]

export const useCashAccountForm = () => {
  const modal = useCashAccountModal()
  const form = $computed(() => modal.form)

  const { mutate: createAccount, isLoading: isCreateLoading, isError: isErrorCreate } = useCashAccountCreate()
  const { mutate: updateAccount, isLoading: isUpdateLoading, isError: isErrorUpdate } = useAccountUpdate(toRef(modal, 'accountId'))
  const { mutate: deleteAccount, isLoading: isDeleteLoading, isError: isErrorDelete } = useAccountDelete(toRef(modal, 'accountId'))

  const loading = computed(() => get(isCreateLoading) || get(isUpdateLoading))
  const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

  const isErrorShown = ref(false)
  watch(hasError, val => set(isErrorShown, !!val))

  const { allIcons: icons } = useIcons()

  const createAccountHandler = (values: Prisma.AccountCreateWithoutUserInput) => {
    createAccount(values, {
      onSuccess: () => {
        modal.hide(() => set(isErrorShown, false))
      },
    })
  }

  const editAccountHandler = (values: Prisma.AccountUpdateWithoutUserInput) => {
    updateAccount(values, {
      onSuccess: () => {
        modal.hide(() => set(isErrorShown, false))
      },
    })
  }

  const deleteAccountHandler = () => {
    deleteAccount(undefined, {
      onSuccess: () => {
        modal.hide(() => set(isErrorShown, false))
      },
    })
  }

  const onSubmit = form.handleSubmit((values) => {
    if (modal.isEdit) {
      editAccountHandler(values)
    } else {
      createAccountHandler(values)
    }
  })

  const onClose = () => {
    modal.reset()
    set(isErrorShown, false)
  }

  return {
    // Loading states
    loading,
    isCreateLoading,
    isUpdateLoading,
    isDeleteLoading,
    // Error state
    isErrorShown,
    // Select options
    icons,
    colors,
    // Form actions
    onSubmit,
    onClose,
    deleteAccount: deleteAccountHandler,
    // others
    modal,
    form,
  }
}
