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
  const userId = (await useAuth()).userId.value as string | undefined

  if (userId) {
    createAccount({ ...values, userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const editAccountHandler = async (values: Prisma.MoneyAccountUncheckedUpdateWithoutUserInput) => {
  const userId = (await useAuth()).userId.value as string | undefined

  if (userId) {
    updateAccount({ ...values, userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const deleteAccountHandler = async () => {
  const userId = (await useAuth()).userId.value as string | undefined

  if (userId) {
    deleteAccount({ userId }, {
      onSuccess: () => {
        modal.hide()
        const route = useRoute()
        if (route.name === 'accounts-accountId') {
          navigateTo({ name: 'accounts' })
        }
      },
    })
  }
}

const onSubmit = form.handleSubmit((values) => {
  if (modal.isEdit) {
    editAccountHandler(values)
  } else {
    createAccountHandler(values)
  }
}, (err) => {
  console.error('Error submitting form', err)
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
      <div>
        <p>Something went wrong</p>
        <ul class="list-disc pl-3.5 mt-2">
          <li v-if="isErrorUpdate" text-sm font-normal>
            You probably did not change any information
          </li>
          <li v-if="isErrorCreate || isErrorUpdate" text-sm font-normal>
            Account with the same name may already exists
          </li>
          <li v-if="isErrorDelete" text-sm font-normal>
            Cannot delete account with transactions
          </li>
        </ul>
      </div>
    </FAlert>

    <form flex flex-col gap-3 @submit.prevent="onSubmit">
      <FInput
        v-model="form.values.name"
        label="Name"
        icon="tabler:text-size"
        placeholder="Account name"
        :invalid="!!form.errors.name"
        :error="form.errors.name"
      />

      <div flex gap-3>
        <FSelectField
          v-model:value="form.values.color"
          block
          :invalid="!!form.errors.color"
          :error="form.errors.color"
          flex-1
          label="Color"
          :items="colors"
        >
          <template #selected="{ item }">
            <div flex items-center gap-4>
              <span
                w="4.5" h="4.5" flex-shrink-0 aspect-square rounded-full
                :class="item?.bg"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
          <template #option="{ item }">
            <div flex items-center gap-4>
              <span
                w="4.5" h="4.5" flex-shrink-0 aspect-square rounded-full
                :class="item.bg"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
        </FSelectField>

        <FSelectField
          v-model:value="form.values.icon"
          :items="icons"
          :invalid="!!form.errors.icon"
          :error="form.errors.icon"
          label="Icon"
          block
          flex-1
        >
          <template #selected="{ item }">
            <div flex items-center gap-4 justify-between>
              <Icon :name="item.value" />
              <p opacity-40 text-sm line-clamp-1>
                {{ (item.value as string).split(':').at(-1) }}
              </p>
            </div>
          </template>
          <template #option="{ item }">
            <div flex items-center gap-4 justify-between>
              <Icon :name="item.value" />
              <p opacity-40 text-sm line-clamp-1>
                {{ (item.value as string).split(':').at(-1) }}
              </p>
            </div>
          </template>
        </FSelectField>
      </div>

      <div flex justify-end gap-2 mt-4>
        <FButton type="button" variant="subtle" @click="modal.hide()">
          Cancel
        </FButton>

        <FTooltip content="Hold to delete" placement="bottom">
          <FButton
            v-if="modal.isEdit"
            ref="deleteBtn"
            :disabled="isUpdateLoading || isCreateLoading"
            :loading="isDeleteLoading"
            type="button"
            variant="danger"
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
