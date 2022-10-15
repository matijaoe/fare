<script lang="ts" setup>
import { get } from '@vueuse/core'

const store = useCashAccountModal()

const { mutate: createAccount, isLoading: isCreateLoading } = useCashAccountCreate()
const { mutate: updateAccount, isLoading: isUpdateLoading } = useAccountUpdate()
const { mutate: deleteAccount, isLoading: isDeleteLoading } = useAccountDelete()

const loading = computed(() => get(isCreateLoading) || get(isUpdateLoading))

const icons = ref([
  { label: 'Wallet', value: 'tabler:wallet' },
  { label: 'Cookie', value: 'tabler:cookie' },
  { label: 'Walk', value: 'tabler:walk' },
])

const colors = ref([
  { label: 'Red', value: 'red', bg: 'bg-red-5', text: 'text-red-5' },
  { label: 'Green', value: 'green', bg: 'bg-green-5', text: 'text-green-5' },
  { label: 'Blue', value: 'blue', bg: 'bg-blue-5', text: 'text-blue-5' },
  { label: 'Amber', value: 'amber', bg: 'bg-amber-5', text: 'text-amber-5' }],
)

const createAccountHandler = () => {
  createAccount(store.form, {
    onSuccess: () => {
      store.hide()
      store.resetForm()
    },
  })
}
const editAccountHandler = () => {
  updateAccount({
    id: store.account!.id,
    body: store.form,
  }, {
    onSuccess: () => {
      store.hide()
      store.resetForm()
    },
  })
}

const deleteAccountHandler = () => {
  deleteAccount(store.account!.id, {
    onSuccess: () => {
      store.hide()
      store.resetForm()
    },
  })
}

const submitHandler = () => {
  if (store.isEdit) {
    editAccountHandler()
  } else {
    createAccountHandler()
  }
}
</script>

<template>
  <ModalBase
    v-model="store.opened"
    panel-class="w-full !sm:min-w-lg"
    closable
    :description="store.isEdit ? 'Edit a cash account' : 'Create a new cash account'"
  >
    <form
      flex
      flex-col
      gap-3
      @submit.prevent="submitHandler"
    >
      <FInput v-model="store.name" label="Name" placeholder="Account name" />

      <div flex gap-3>
        <FSelectField
          v-model="store.color"
          flex-1
          label="Color"
          :items="colors"
        >
          <template #selected="{ item }">
            <div
              flex
              items-center
              gap-3
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
          v-model="store.icon"
          flex-1
          label="Icon"
          :items="icons"
        >
          <template #selected="{ item }">
            <div
              flex
              items-center
              gap-2
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
        <FButton type="button" variant="subtle" @click="store.hide()">
          Cancel
        </FButton>
        <FButton
          v-if="store.isEdit"
          type="button"
          variant="danger"
          :disabled="loading"
          :loading="isDeleteLoading"
          icon="tabler:x"
          @click="deleteAccountHandler"
        >
          Delete
        </FButton>
        <FButton
          v-if="store.isEdit"
          type="submit"
          icon="tabler:edit"
          :loading="loading"
        >
          Edit
        </FButton>
        <FButton
          v-if="store.isCreate"
          type="submit"
          icon="tabler:plus"
          :loading="loading"
        >
          Create
        </FButton>
      </div>
    </form>
  </ModalBase>
</template>
