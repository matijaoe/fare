<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'
import { set } from '@vueuse/core'
import type { SelectItem } from '~~/models/ui'

type Props = {
  items: SelectItem[]
  modelValue: SelectItem
  placeholder?: string
  block?: boolean
  selectClass?: string | string[]
}

type Emits = {
  (e: 'update:modelValue', value: SelectItem | null): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const selectedItem = computed({
  get: (): SelectItem | null => props.modelValue ?? null,
  set: (value: SelectItem | null) => emit('update:modelValue', value),
})

const clearSelected = () => set(selectedItem, null)

const listboxButton = ref()
const isHovered = useElementHover(listboxButton)

const widthStyle = computed(() => props.block ? 'max-w-full' : 'max-w-60')
</script>

<template>
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
      border="1.5"
      flex="~ gap-4"
      items-center
      outline="none focus:none"
      class="bg-stone-2 dark:bg-stone-8 border-transparent disabled:(bg-stone-1 dark:bg-stone-9/50 border-stone-3 dark:border-stone-7 opacity-50) focus-visible:(border-stone-8 dark:border-stone-3) leading-5"
      :class="[open ? 'border-rounded-t-sm' : 'border-rounded-sm', selectClass]"
    >
      <span v-if="selectedItem" class="block truncate"> {{ selectedItem?.label || '' }}</span>
      <span v-else>
        <slot name="placeholder">
          <p text="stone-8 dark:stone-3">{{ placeholder || 'Select an item' }}</p>
        </slot>
      </span>

      <span
        pos="absolute inset-y-0 right-0"
        flex="center"
        pr-3
      >
        <button
          v-if="selectedItem && isHovered"
          flex="center"
          class="text-stone-4"
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
        w-full
        absolute
        :class="[widthStyle]"
        py-1
        outline="none focus:none"
        border="1.5 t-0 rounded-b-sm stone-2 dark:stone-8"
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
            text="stone-7 dark:stone-3"
            p="y-2 x-6 r-13"
            relative
            class="relative cursor-default select-none"
            :class="[
              active && !selected ? 'bg-stone-1 dark:bg-stone-8/50 text-color-base' : '',
              selected ? 'bg-stone-2/40 dark:bg-stone-8 text-color-base' : '',
              item.disabled ? '!text-stone-3 !dark:text-stone-7' : '',
            ]"
          >
            <slot name="option" :item="item">
              <span
                class="block truncate"
              >
                {{ item.label }}
              </span>
              <span
                v-if="selected"
                pr="4"
                text="color-base"
                pos="absolute inset-y-0 right-0"
                class="flex items-center"
              >
                <Icon name="tabler:check" />
              </span>
            </slot>
          </li>
        </ListboxOption>
      </ListboxOptions>
    </Transition>
  </Listbox>
</template>
