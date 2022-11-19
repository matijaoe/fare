<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import { get, set } from '@vueuse/core'

const modal = useCashAccountModal()

const form = $computed(() => modal.form)

const accountId = toRef(modal, 'accountId')

const { mutate: createAccount, isLoading: isCreateLoading, isError: isErrorCreate, reset: resetCreate } = useCashAccountCreate()
const { mutate: updateAccount, isLoading: isUpdateLoading, isError: isErrorUpdate, reset: resetUpdate } = useAccountUpdate(accountId)
const { mutate: deleteAccount, isLoading: isDeleteLoading, isError: isErrorDelete, reset: resetDelete } = useAccountDelete(accountId)

const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

const { allIcons: icons } = useIcons()
const { colorOptions: colors } = useAppColors()

const createAccountHandler = async (values: Prisma.MoneyAccountCreateWithoutUserInput) => {
  const { userId } = await useAuth()

  if (userId.value) {
    createAccount({ ...values, userId: userId.value }, {
      onSuccess: () => modal.hide(),
    })
  }

  // createAccount(values, {
  //   onSuccess: () => modal.hide(),
  // })
}

const editAccountHandler = (values: Prisma.MoneyAccountUpdateWithoutUserInput) => {
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

const deleteBtn = ref<HTMLElement | null>(null)
const longPressedHook = ref(false)

const onLongPressCallbackHook = () => {
  set(longPressedHook, true)
  deleteAccountHandler()
}

onLongPress(
  deleteBtn,
  onLongPressCallbackHook,
  {
    modifiers: { prevent: true },
    delay: 1000,
  },
)

const modalConfig = computed(() => ({
  title: 'Cash account',
  description: modal.isEdit ? 'Edit a cash account' : 'Create a new cash account',
  closable: true,
  panelClass: 'w-full !sm:min-w-xl',
}))
</script>

<template>
  <ModalBase
    v-model="modal.opened"
    v-bind="modalConfig"
    @close="onClose"
  >
    <FAlert v-if="hasError" type="error" mb-3>
      Something went wrong.
    </FAlert>

    <form
      flex
      flex-col
      gap-3
      @submit.prevent="onSubmit"
    >
      <FInput
        v-model="form.values.name"
        label="Name"
        placeholder="Account name"
        :invalid="!!form.errors.name"
        :error="form.errors.name"
      />

      <div flex gap-3>
        <FSelectField
          v-model="modal.colorObject"
          block
          :invalid="!!form.errors.color"
          :error="form.errors.color"
          flex-1
          label="Color"
          :items="colors"
        >
          <template #selected="{ item }">
            <div
              flex
              items-center
              gap-4
            >
              <span
                w="4.5"
                h="4.5"
                flex-shrink-0
                aspect="square"
                rounded-full
                :class="item?.bg"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
          <template #option="{ item }">
            <div
              flex
              items-center
              gap-4
            >
              <span
                w="4.5"
                h="4.5"
                flex-shrink-0
                aspect="square"
                rounded-full
                :class="item.bg"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </FSelectField>

        <FSelectField
          v-model="modal.iconObject"
          block
          :invalid="!!form.errors.icon"
          :error="form.errors.icon"
          flex-1
          label="Icon"
          :items="icons"
        >
          <template #selected="{ item }">
            <div
              flex
              items-center
              gap-4
            >
              <Icon :name="item.value" />
              <span>{{ item.label }}</span>
            </div>
          </template>
          <template #option="{ item }">
            <div
              flex
              items-center
              gap-4
            >
              <Icon :name="item.value" />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </FSelectField>
      </div>

      <div
        flex
        justify-end
        gap-2
        mt-4
      >
        <FButton type="button" variant="subtle" @click="modal.hide()">
          Cancel
        </FButton>

        <FTooltip content="Hold to delete" placement="bottom">
          <FButton
            v-if="modal.isEdit"
            ref="deleteBtn"
            type="button"
            variant="danger"
            :disabled="isUpdateLoading || isCreateLoading"
            :loading="isDeleteLoading"
            icon="tabler:x"
          >
            Delete
          </FButton>
        </FTooltip>

        <FButton
          v-if="modal.isEdit"
          type="submit"
          icon="tabler:edit"
          :loading="isUpdateLoading"
        >
          Edit
        </FButton>
        <FButton
          v-if="modal.isCreate"
          type="submit"
          icon="tabler:plus"
          :loading="isCreateLoading"
        >
          Create
        </FButton>
      </div>
    </form>
  </ModalBase>
</template>
