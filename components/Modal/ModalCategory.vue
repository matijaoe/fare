<script lang="ts" setup>
import type { Prisma } from '@prisma/client'
import { get, set } from '@vueuse/core'
import { useCategoryModal } from '~~/store/modal/category-modal.store'

const modal = useCategoryModal()

const form = $computed(() => modal.form)

const categoryId = toRef(modal, 'categoryId')

const { mutate: createCategory, isLoading: isCreateLoading, isError: isErrorCreate, reset: resetCreate } = useCategoryCreate()
const { mutate: updateCategory, isLoading: isUpdateLoading, isError: isErrorUpdate, reset: resetUpdate } = useCategoryUpdate(categoryId)
const { mutate: deleteCategory, isLoading: isDeleteLoading, isError: isErrorDelete, reset: resetDelete } = useCategoryDelete(categoryId)

const hasError = computed(() => get(isErrorCreate) || get(isErrorUpdate) || get(isErrorDelete))

const { categoryIcons: icons } = useIcons()
const { colorOptions: colors } = useAppColors()

const createCategoryHandler = async (values: Prisma.CategoryCreateWithoutUserInput) => {
  const { userId } = $(useAuth())

  if (userId) {
    createCategory({ ...values, userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const editCategoryHandler = async (values: Prisma.CategoryUncheckedUpdateWithoutUserInput) => {
  const { userId } = $(useAuth())

  if (userId) {
    updateCategory({ ...values, userId }, {
      onSuccess: () => modal.hide(),
    })
  }
}

const deleteCategoryHandler = async () => {
  const { userId } = $(useAuth())

  if (userId) {
    deleteCategory({ userId }, {
      onSuccess: () => {
        modal.hide()
        const route = useRoute()
        if (route.name === 'categories-categoryId') {
          navigateTo({ name: 'categories' })
        }
      },
    })
  }
}

const onSubmit = form.handleSubmit((values) => {
  if (modal.isEdit) {
    editCategoryHandler(values)
  } else {
    createCategoryHandler(values)
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
  deleteCategoryHandler()
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
  title: 'Category',
  description: modal.isEdit ? 'Edit a category' : 'Create a new category',
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
        placeholder="Category name"
        :invalid="!!form.errors.name"
        :error="form.errors.name"
      />

      <div flex gap-3>
        <FSelectField
          v-model:value="form.values.color"
          :items="colors"
          :invalid="!!form.errors.color"
          :error="form.errors.color"
          block flex-1
          label="Color"
        >
          <template #selected="{ item }">
            <div flex items-center gap-4>
              <span
                w="4.5" h="4.5" flex-shrink-0 aspect="square" rounded-full
                :class="item?.bg"
              />
              <span>{{ item.label }}</span>
            </div>
          </template>
          <template #option="{ item }">
            <div flex items-center gap-4>
              <span
                w="4.5" h="4.5" flex-shrink-0 aspect="square" rounded-full
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
          block flex-1
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
              <Icon v-memo="item.value" :name="item.value" />
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
