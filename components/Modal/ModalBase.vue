<script setup lang="ts">
import {
  Dialog,
  DialogDescription,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'
import { set } from '@vueuse/core'

type Props = {
  modelValue?: boolean
  title?: string
  description?: string
  closable?: boolean
  panelClass?: string | string[]
}

type Emits = {
  (e: 'close'): void
  (e: 'update:modelValue', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const opened = computed<boolean>({
  get: () => !!props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
})

const close = () => {
  set(opened, false)
  emit('close')
}

const slots = useSlots()
const hasDefined = (name: 'title' | 'description') => slots[name] || props[name]
const hasDefinedBaseSlots = computed(() =>
  hasDefined('title') || hasDefined('description'),
)

const transitions = {
  enter: 'duration-300 ease-out',
  enterFrom: 'opacity-0',
  enterTo: 'opacity-100',
  leave: 'duration-150 ease-in',
  leaveFrom: 'opacity-100',
  leaveTo: 'opacity-0',
}
</script>

<template>
  <TransitionRoot :show="opened">
    <Dialog
      z-500
      relative
      @close="close"
    >
      <TransitionChild v-bind="transitions">
        <FBackdrop />
      </TransitionChild>

      <!-- Full-screen container to center the panel -->
      <div
        fixed
        inset-0
        flex-center
        z-1000
        p-4
      >
        <!-- Container to center the panel -->
        <TransitionChild
          flex="center"
          v-bind="transitions"
        >
          <DialogPanel
            class="w-full sm:(w-fit min-w-sm max-w-xl)"
            :class="[panelClass]"
          >
            <FCard
              white
              text="zinc-9 dark:zinc-3"
              min-h="20"
            >
              <!-- Title, description, close toggle -->
              <div
                relative
                flex="~ gap-4"
                items="start"
                w="full"
                justify="between"
              >
                <div
                  v-if="hasDefinedBaseSlots"
                  relative
                  space-y-4
                  w-full
                  :class="{ 'max-w-[calc(100%-2rem)]': closable }"
                >
                  <DialogTitle v-if="hasDefined('title')">
                    <slot name="title">
                      <h2
                        text-xl
                        font-bold
                        leading-tight
                      >
                        {{ title }}
                      </h2>
                    </slot>
                  </DialogTitle>
                  <DialogDescription v-if="hasDefined('description')" text="zinc-7 dark:zinc-4">
                    <slot name="description">
                      {{ description }}
                    </slot>
                  </DialogDescription>
                </div>
                <FCloseButton
                  v-if="closable"
                  absolute
                  class="-top-1 -right-1"
                  @close="close"
                />
              </div>

              <!-- Default slot -->
              <div
                v-if="$slots.default"
                :class="{
                  'mt-4': hasDefinedBaseSlots,
                  'mt-8': closable && !hasDefinedBaseSlots,
                }"
              >
                <slot :close="close" />
              </div>
            </FCard>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
