<script lang="ts" setup>
import { get, set } from '@vueuse/core'

const modal = useCashAccountModal()
const { mutate: createAccount, isLoading } = useCashAccountCreate()

const icons = ref([
  {
    label: 'Wallet',
    value: 'tabler:wallet',
  },
  {
    label: 'Cookie',
    value: 'tabler:cookie',
  },
  {
    label: 'Walk',
    value: 'tabler:walk',
  },
])

const colors = ref([
  { label: 'Red', value: 'red', bg: 'bg-red-5', text: 'text-red-5' },
  { label: 'Green', value: 'green', bg: 'bg-green-5', text: 'text-green-5' },
  { label: 'Blue', value: 'blue', bg: 'bg-blue-5', text: 'text-blue-5' },
  { label: 'Amber', value: 'amber', bg: 'bg-amber-5', text: 'text-amber-5' }],
)

const name = ref()
const color = ref()
const icon = ref()

const form = computed(() => ({
  name: get(name),
  icon: get(icon).value,
  color: get(color).value,
}))

const resetForm = () => {
  set(name, '')
  set(color, undefined)
  set(icon, undefined)
}
const createAccountHandler = () => {
  createAccount(form.value, {
    onSuccess: () => {
      resetForm()
      modal.hide()
    },
  })
}
</script>

<template>
  <ModalBase
    v-model="modal.opened"
    closable
    description="Create a new cash account"
  >
    <form
      flex
      flex-col
      gap-3
      @submit.prevent="createAccountHandler"
    >
      <FInput v-model="name" label="Name" placeholder="Account name" />

      <div flex gap-3>
        <FSelectField
          v-model="color"
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
          v-model="icon"
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

      <div flex justify-end mt-4>
        <FButton type="button" variant="subtle">
          Cancel
        </FButton>
        <FButton type="submit" icon="tabler:plus" :loading="isLoading">
          Create
        </FButton>
      </div>
    </form>
  </ModalBase>
</template>
