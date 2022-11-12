<script lang="ts" setup>
import { useCategoryModal } from '~~/store/modal/category-modal.store'

const modal = useCategoryModal()

const onClose = () => {
  modal.reset()
}

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
    modal base
  </ModalBase>
</template>
