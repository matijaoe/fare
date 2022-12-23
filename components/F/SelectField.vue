<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { set } from '@vueuse/core'
import type { SelectItemDefault } from '~~/models/ui'

type Props = {
  items: SelectItemDefault[]
  modelValue?: SelectItemDefault
  value?: string | number
  label?: string
  placeholder?: string
  invalid?: boolean
  positive?: boolean
  disabled?: boolean
  icon?: string
  block?: boolean
  selectClass?: string | string[]
  hint?: string
  error?: string
  loading?: boolean
}

type Emits = {
  (e: 'update:modelValue', value: SelectItemDefault | null): void
  (e: 'update:value', value: number | string | null): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const wrapperProps = computed(() => ({
  icon: props.icon,
  loading: props.loading,
  label: props.label,
  hint: props.hint,
  error: props.error,
  invalid: props.invalid,
  positive: props.positive,
  disabled: props.disabled,
}))

const selectedItem = computed({
  get: () => props?.modelValue ?? props.items.find(item => item.value === props.value) ?? null,
  set: (value: SelectItemDefault | null) => {
    emit('update:value', value?.value ?? null)
    emit('update:modelValue', value)
  },
})

const isSelected = (item: SelectItemDefault) => item.value === selectedItem.value?.value

const clearSelected = () => set(selectedItem, null)

const listboxButton = ref()
const isHovered = useElementHover(listboxButton)

const widthStyle = computed(() => props.block ? 'max-w-full' : 'max-w-60')

const stateStyle = computed(() => {
  const { invalid, positive } = props
  if (invalid) {
    return 'bg-red-1/50 border-red-6 dark:(bg-red-9/25 border-red-5/60)) focus:(border-red-6 dark:border-red-5/60)'
  }
  if (positive) {
    return 'bg-green-1/50 border-green-6 dark:(bg-green-9/25 border-green-5/60) focus:(border-green-6 dark:border-green-5/60)'
  }
  return 'bg-zinc-2 dark:bg-zinc-8 border-transparent focus:(border-zinc-8 dark:border-zinc-4) invalid:(bg-red-1/50 border-red-6 dark:(bg-red-9/25 border-red-5/60) focus:(border-red-6 dark:border-red-5/60))'
})

const stateIconStyle = computed(() => {
  const { invalid, positive, disabled } = props
  if (invalid) {
    return 'not-focus:(text-red-5)'
  }
  if (positive) {
    return 'not-focus:(text-green-5)'
  }
  if (disabled) {
    return 'text-zinc-3 dark:text-zinc-7'
  }
  return 'color-base-lighter'
})

const disabledStyle = computed(() => 'disabled:(bg-zinc-1 dark:bg-zinc-9/50 border-zinc-3 dark:border-zinc-7 opacity-50 cursor-not-allowed)')
</script>

<template>
  <FInputWrapper v-bind="wrapperProps" font-sans>
    <Listbox
      v-slot="{ open }"
      v-model="selectedItem"
      as="div"
      w="full"
      :class="[widthStyle]"
      relative
    >
      <ListboxButton
        ref="listboxButton"
        w="full"
        h="41px"
        p="y-2.5 x-4 r-12"
        text="base"
        border="2"
        flex="~ gap-3"
        items-center
        outline="none focus:none"
        :class="[open ? 'border-rounded-t-md' : 'border-rounded-md', disabledStyle, stateStyle, selectClass]"
      >
        <div
          v-if="icon || $slots.left"
          text="zinc-8"
          flex-center
        >
          <slot name="left">
            <Icon :name="icon" :class="[stateIconStyle]" />
          </slot>
        </div>
        <span
          v-if="selectedItem"
          w-full text-left
          class="block truncate"
        >
          <slot name="selected" :item="selectedItem">
            {{ selectedItem.label }}
          </slot>
        </span>
        <span v-else>
          <slot name="placeholder">
            <p class="leading-5 text-zinc-5/60 font-normal">
              {{ placeholder || 'Select an item' }}
            </p>
          </slot>
        </span>

        <span
          pos="absolute inset-y-0 right-0"
          flex="center"
          pr-3
        >
          <button
            v-if="selectedItem && isHovered"
            type="button"
            flex="center"
            text-zinc-4
            @click.stop="clearSelected"
          >
            <Icon name="tabler:x" />
          </button>
          <Icon
            v-else
            class="pointer-events-none"
            :name="open ? 'tabler:chevron-up' : 'tabler:chevron-down'"
            text="color-base"
          />
        </span>
      </ListboxButton>

      <Transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div v-show="open">
          <ListboxOptions
            static
            z-100
            bg="base"
            w-full
            absolute
            :class="[widthStyle]"
            py-1 outline="none focus:none"
            border="2 t-0 rounded-b-md"
            border-base
            max-h="sm:!193px"
            overflow-y="auto"
          >
            <ListboxOption
              v-for="item in items"
              v-slot="{ active, selected }"
              :key="item.value"
              :value="item"
              as="template"
              :disabled="item.disabled"
            >
              <li
                w-full
                text="zinc-7 dark:zinc-3"
                p="y-2 x-4"
                relative
                class="relative cursor-default select-none"
                :class="[
                  active && !(selected || isSelected(item)) ? 'bg-zinc-1 dark:bg-zinc-8/50 color-base' : '',
                  selected || isSelected(item) ? 'bg-zinc-2/40 dark:bg-zinc-8 color-base pr-12' : '',
                  item.disabled ? '!text-zinc-3 !dark:text-zinc-7' : '',
                ]"
              >
                <slot name="option" :item="item" :selected="selected || isSelected(item)">
                  <span class="block truncate">
                    {{ item.label }}
                  </span>
                </slot>
                <span
                  v-if="selected || isSelected(item)"
                  pr-4
                  text-color-base
                  absolute
                  pos="inset-y-0 right-0"
                  class="flex items-center"
                >
                  <Icon name="tabler:check" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </div>
      </Transition>
    </Listbox>
  </FInputWrapper>
</template>
