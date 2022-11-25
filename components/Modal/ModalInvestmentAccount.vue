<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import { InvestmentType } from '@prisma/client'
import { get, set } from '@vueuse/core'

const modal = useInvestmentAccountModal()

const form = $computed(() => modal.form)

const accountId = toRef(modal, 'accountId')

const { mutate: createAccount, isLoading: isCreateLoading, isError: isErrorCreate, reset: resetCreate } = useInvestmentAccountCreate()
// TODO: but how to update investment account - specifically the description? create new query and endpoint for it
const { mutate: updateAccount, isLoading: isUpdateLoading, isError: isErrorUpdate, reset: resetUpdate } = useAccountUpdate(accountId)
const { mutate: deleteAccount, isLoading: isDeleteLoading, isError: isErrorDelete, reset: resetDelete } = useAccountDelete(accountId)

const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

const { allIcons: icons } = useIcons()
const { colorOptions: colors } = useAppColors()

const createAccountHandler = async (values: Prisma.MoneyAccountUncheckedCreateWithoutUserInput & Prisma.InvestmentAccountUncheckedCreateInput) => {
  // TODO: get type
  const { description, expectedRateOfReturn, ...accountData } = values

  // TODO: temp
  const type = InvestmentType.Stocks
  const investmentAccountData = { description, expectedRateOfReturn, type }
  const userId = (await useAuth()).userId.value as string | undefined

  if (userId) {
    const account = { ...accountData, userId }
    createAccount({ account, ...investmentAccountData }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const editAccountHandler = async (values: Prisma.MoneyAccountUncheckedUpdateWithoutUserInput & Prisma.InvestmentAccountUncheckedUpdateInput) => {
  const userId = (await useAuth()).userId.value as string | undefined
  // TODO: handle full-on investment account update later
  const { description, expectedRateOfReturn, type, ...accountData } = values

  if (userId) {
    updateAccount({ ...accountData, userId }, {
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
  title: 'Investment account',
  description: modal.isEdit ? 'Edit a investment account' : 'Create a new investment account',
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

    <form flex flex-col gap-3 @submit.prevent="onSubmit">
      <FInput
        v-model="form.values.name"
        label="Name"
        icon="tabler:text-size"
        placeholder="Account name"
        :invalid="!!form.errors.name"
        :error="form.errors.name"
      />

      <FTextarea
        v-model="form.values.description"
        icon="tabler:text-plus"
        label="Description"
        placeholder="What is this account for?"
        :invalid="!!form.errors.description"
        :error="form.errors.description"
      />

      <FInput
        v-model="form.values.expectedRateOfReturn"
        icon="tabler:percentage"
        type="number"
        label="Rate of return"
        placeholder="ex 9%"
        :invalid="!!form.errors.expectedRateOfReturn"
        :error="form.errors.expectedRateOfReturn"
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
          v-model="modal.iconObject"
          :items="icons"
          :invalid="!!form.errors.icon"
          :error="form.errors.icon"
          label="Icon"
          block
          flex-1
        >
          <template #selected="{ item }">
            <div flex items-center gap-4>
              <Icon :name="item.value" />
              <span>{{ item.label }}</span>
            </div>
          </template>
          <template #option="{ item }">
            <div flex items-center gap-4>
              <Icon :name="item.value" />
              <span>{{ item.label }}</span>
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
