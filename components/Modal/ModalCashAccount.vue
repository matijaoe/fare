<script lang="ts" setup>
import { set } from '@vueuse/core'

const {
  loading,
  hasError,
  isErrorShown,
  isDeleteLoading,
  icons,
  colors,
  onSubmit,
  deleteAccount,
} = useCashAccountForm()

const modal = useCashAccountModal()
const form = $computed(() => modal.form)

const onClose = () => {
  form.resetForm()
  set(isErrorShown, false)
}
</script>

<template>
  <ModalBase
    v-model="modal.opened"
    panel-class="w-full !sm:min-w-xl"
    closable
    :description="modal.isEdit ? 'Edit a cash account' : 'Create a new cash account'"
    @close="onClose"
  >
    <FAlert v-if="isErrorShown && hasError" type="error" mb-3>
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
        :invalid="!!form.errors.name"
        :error="form.errors.name"
        label="Name"
        placeholder="Account name"
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
        <FButton
          v-if="modal.isEdit"
          type="button"
          variant="danger"
          :disabled="loading"
          :loading="isDeleteLoading"
          icon="tabler:x"
          @click="deleteAccount"
        >
          Delete
        </FButton>
        <FButton
          v-if="modal.isEdit"
          type="submit"
          icon="tabler:edit"
          :loading="loading"
        >
          Edit
        </FButton>
        <FButton
          v-if="modal.isCreate"
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
