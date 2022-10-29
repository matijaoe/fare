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
  (e: 'update:modelValue', value: SelectItemDefault | undefined): void
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
  get: () => props.modelValue,
  set: (value: SelectItemDefault | undefined) => emit('update:modelValue', value),
})

const isSelected = (item: SelectItemDefault) => item.value === selectedItem.value?.value

const clearSelected = () => set(selectedItem, null)

const listboxButton = ref()
const isHovered = useElementHover(listboxButton)

const widthStyle = computed(() => props.block ? 'max-w-full' : 'max-w-60')
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
        class="bg-zinc-2 dark:bg-zinc-8 border-transparent disabled:(bg-zinc-1 dark:bg-zinc-9/50 border-zinc-3 dark:border-zinc-7 opacity-50) focus-visible:(border-zinc-8 dark:border-zinc-3) leading-5"
        :class="[open ? 'border-rounded-t-md' : 'border-rounded-md', selectClass]"
      >
        <div
          v-if="icon || $slots.left"
          text="zinc-8"
          flex-center
        >
          <slot name="left">
            <Icon :name="icon" class="color-base-lighter" />
          </slot>
        </div>
        <span
          v-if="selectedItem"
          w-full
          text-left
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
            class="text-zinc-4"
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
        <ListboxOptions
          z-100
          bg="base"
          w-full
          absolute
          :class="[widthStyle]"
          py-1
          outline="none focus:none"
          border="2 t-0 rounded-b-md zinc-2 dark:zinc-8"
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
              p="y-2 x-4 r-13"
              relative
              class="relative cursor-default select-none"
              :class="[
                active && !(selected || isSelected(item)) ? 'bg-zinc-1 dark:bg-zinc-8/50 color-base' : '',
                selected || isSelected(item) ? 'bg-zinc-2/40 dark:bg-zinc-8 color-base' : '',
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
                bg-zinc-1
                absolute
                pos="inset-y-0 right-0"
                class="flex items-center"
              >
                <Icon name="tabler:check" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </Listbox>
  </FInputWrapper>
</template>
