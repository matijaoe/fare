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
  modelValue?: SelectItem & Record<string, any>
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
  (e: 'update:modelValue', value: SelectItem | null): void
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
  get: (): SelectItem | null => props.modelValue ?? null,
  set: (value: SelectItem | null) => emit('update:modelValue', value),
})

const clearSelected = () => set(selectedItem, null)

const listboxButton = ref()
const isHovered = useElementHover(listboxButton)

const widthStyle = computed(() => props.block ? 'max-w-full' : 'max-w-60')
</script>

<template>
  <!-- TODO: select label -->
  <FInputWrapper v-bind="wrapperProps" font-sans>
    <!-- <template v-if="$slots.label" #label>
      <slot name="label" />
    </template> -->

    <Listbox
      v-slot="{ open }"
      v-model="selectedItem"
      as="div"
      w="full"
      :class="[widthStyle]"
      relative
    >
      <!-- TODO: have icon padding space in line with input styles -->
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
              p="y-2 x-6 r-13"
              relative
              class="relative cursor-default select-none"
              :class="[
                active && !selected ? 'bg-zinc-1 dark:bg-zinc-8/50 color-base' : '',
                selected ? 'bg-zinc-2/40 dark:bg-zinc-8 color-base' : '',
                item.disabled ? '!text-zinc-3 !dark:text-zinc-7' : '',
              ]"
            >
              <slot name="option" :item="item">
                <span
                  class="block truncate"
                >
                  {{ item.label }}
                </span>
              </slot>
              <span
                v-if="selected"
                pr="4"
                text="color-base"
                pos="absolute inset-y-0 right-0"
                class="flex items-center"
              >
                <Icon name="tabler:check" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </Transition>
    </Listbox>

    <!-- <template v-if="$slots.hint" #hint>
      <slot name="hint" />
    </template>

    <template v-if="$slots.error" #error>
      <slot name="error" />
    </template> -->
  </FInputWrapper>
</template>
