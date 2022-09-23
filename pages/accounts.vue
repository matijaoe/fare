<script lang="ts" setup>
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const opened = ref(false)
</script>

<template>
  <div>
    {{ $route.name }}
    <FTooltip content="Hi!" bg-red-500>
      <button>Tippy!</button>
    </FTooltip>
    <div>
      <button v-tippy="tippyyye">
        test
      </button>
    </div>
    <div>
      <FButton
        type="button"
        @click="opened = true"
      >
        Open dialog
      </FButton>
    </div>

    <ModalBase
      v-model="opened"
      title="Enter your expenses"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      closable
    >
      <p>
        Placeat dolor corrupti, tempore dicta doloremque atque illum et architecto vel sequi officiis sunt voluptate aperiam dolores non ipsum enim iusto aliquam!
        Reprehenderit enim minima, labore unde reiciendis, nobis adipisci sunt magnam praesentium provident fuga. Incidunt, aspernatur expedita! Doloribus provident nobis tempora! Natus aspernatur aliquam exercitationem commodi earum porro? Odit, quisquam possimus!
      </p>
    </ModalBase>

    <Popover
      v-slot="{ open }"
      relative
      w-fit
      mt-8
    >
      <PopoverButton
        :class="{ 'text-opacity-90': open }"
        class="group inline-flex items-center rounded-md bg-orange-700 px-3 py-2 text-base font-medium text-white hover:text-opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        <span>Solutions</span>
      </PopoverButton>

      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="translate-y-1 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-1 opacity-0"
      >
        <PopoverPanel
          class="rounded bg-white w-[fit-content] absolute bottom-[calc(100%+0.5rem)] left-50% translate-x-[-50%]"
          p="y-2 x-3"
          text="xs"
          shadow
        >
          test
        </PopoverPanel>
      </transition>
    </Popover>
  </div>
</template>
