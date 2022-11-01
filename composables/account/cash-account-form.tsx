import type { Prisma } from '@prisma/client'
import { get } from '@vueuse/core'

export const useCashAccountForm = () => {
  const modal = useCashAccountModal()

  const form = $computed(() => modal.form)

  const accountId = toRef(modal, 'accountId')

  const { mutate: createAccount, isLoading: isCreateLoading, isError: isErrorCreate, reset: resetCreate } = useCashAccountCreate()
  const { mutate: updateAccount, isLoading: isUpdateLoading, isError: isErrorUpdate, reset: resetUpdate } = useAccountUpdate(accountId)
  const { mutate: deleteAccount, isLoading: isDeleteLoading, isError: isErrorDelete, reset: resetDelete } = useAccountDelete(accountId)

  const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

  const { allIcons: icons } = useIcons()
  const { colorOptions: colors } = useAppColors()

  const createAccountHandler = (values: Prisma.AccountCreateWithoutUserInput) => {
    createAccount(values, {
      onSuccess: () => modal.hide(),
    })
  }

  const editAccountHandler = (values: Prisma.AccountUpdateWithoutUserInput) => {
    updateAccount(values, {
      onSuccess: () => modal.hide(),
    })
  }

  const deleteAccountHandler = () => {
    deleteAccount(undefined, {
      onSuccess: () => modal.hide(),
    })
  }

  const onSubmit = form.handleSubmit((values) => {
    if (modal.isEdit) {
      editAccountHandler(values)
    } else {
      createAccountHandler(values)
    }
  })

  const resetQueries = () => {
    resetCreate()
    resetUpdate()
    resetDelete()
  }

  const onClose = () => {
    modal.reset()

    resetQueries()
  }

  return {
    // Loading states
    isCreateLoading,
    isUpdateLoading,
    isDeleteLoading,
    // Error state
    hasError,
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
