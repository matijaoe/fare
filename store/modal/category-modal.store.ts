import type { Category } from '@prisma/client'
import { toFormValidator } from '@vee-validate/zod'
import { set } from '@vueuse/core'
import { acceptHMRUpdate, defineStore } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as zod from 'zod'
import { toTitleCase } from '~~/utils'

type ActionType = 'create' | 'edit'

export const useCategoryModal = defineStore('modal-category', () => {
  // Modal type
  const modalType = ref<ActionType>('create')
  const isEdit = computed(() => modalType.value === 'edit')
  const isCreate = computed(() => modalType.value === 'create')

  // Values
  const categoryId = ref<string>()

  const validationSchema = toFormValidator(
    zod.object({
      name: zod.string({ required_error: 'Names is required' }).trim().min(1, { message: 'Name is required' }).max(24, { message: 'Name is too long' }),
      color: zod.any().optional(),
      icon: zod.any().optional(),
    }),
  )

  const form = useForm<{
    name: string
    color: string | null
    icon: string | null
  }>({
    validationSchema,
  })

  useField<string>('name')
  useField<string | null>('color')
  useField<string | null>('icon')

  // Select values

  const colorObject = computed({
    get: () => form.values.color
      ? {
          label: toTitleCase(form.values.color),
          value: form.values.color,
          bg: `bg-${form.values.color}-5`,
          text: `text-${form.values.color}-5`,
        }
      : null,
    set: obj => form.setFieldValue('color', obj?.value ?? null),
  })

  const iconObject = computed({
    get: () => form.values.icon
      ? {
          label: toTitleCase(form.values.icon?.split(':').at(-1) || 'None'),
          value: form.values.icon,
        }
      : null,
    set: obj => form.setFieldValue('icon', obj?.value ?? null),
  })

  // Modal state

  const open = ref(false)

  const opened = computed({
    get: () => open.value,
    set: value => set(open, value),
  })

  const setEditCategory = (category: Category) => {
    const { id, name, color, icon } = category
    set(categoryId, id)

    form.setValues({ name, color, icon })
  }

  const launch = (category?: Category) => {
    if (category) {
      setEditCategory(category)
      set(modalType, 'edit')
    } else {
      set(modalType, 'create')
    }

    set(open, true)
  }

  const reset = () => {
    form.resetForm()
    set(modalType, 'create')
    set(categoryId, undefined)
  }

  const hide = () => {
    set(open, false)
    setTimeout(reset, 200)
  }

  return {
    // Modal type
    isEdit,
    isCreate,
    // Value for edit
    categoryId,
    // Select item value
    colorObject,
    iconObject,
    // Form
    form,
    reset,
    showError,
    // Modal state
    opened,
    launch,
    hide,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategoryModal, import.meta.hot))
}
