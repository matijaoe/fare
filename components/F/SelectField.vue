<script setup lang="ts">
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

const people = [
  { id: 1, name: 'Durward Reynolds', unavailable: false },
  { id: 2, name: 'Kenton Towne', unavailable: false },
  { id: 3, name: 'Therese Wunsch', unavailable: false },
  { id: 4, name: 'Benedict Kessler', unavailable: true },
  { id: 5, name: 'Katelyn Rohan', unavailable: false },
]
const selectedPerson = ref(people[0])
</script>

<template>
  <Listbox v-slot="{ open }" v-model="selectedPerson">
    <ListboxButton
      h="41px"
      p="y-2.5 x-4 r-9"
      text="base"
      border="1.5 rounded-sm"
      flex="~ gap-4"
      items-center
      outline="none focus:none"
      class="peer bg-stone-2 dark:bg-stone-8 border-transparent disabled:(bg-stone-1 dark:bg-stone-9/50 border-stone-3 dark:border-stone-7 opacity-50) focus:(bg-stone-2/75 dark:bg-stone-8 border-stone-8 dark:border-stone-3) leading-5 placeholder-stone-5/60 placeholder-shown:font-normal"
      relative
    >
      <span class="block truncate"> {{ selectedPerson.name }}</span>
      <span
        pos="absolute inset-y-0 right-0"
        flex="center"
        pr-2
        class="pointer-events-none"
      >
        <Icon :icon="open ? 'i-tabler-chevron-up' : 'i-tabler-chevron-down'" aria-hidden="true" />
      </span>
    </ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="person in people"
        :key="person.id"
        :value="person"
        :disabled="person.unavailable"
      >
        {{ person.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
