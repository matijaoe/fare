<script lang="ts" setup>
import type { SelectItem } from '~~/models/ui/select'

const loading = ref(false)

const people = [
  { id: 1, name: 'Durward Reynolds', disabled: false },
  { id: 2, name: 'Kenton Towne', disabled: false },
  { id: 3, name: 'Therese Wunsch Ani Stazija', disabled: false },
  { id: 4, name: 'Benedict Kessler', disabled: true },
  { id: 5, name: 'Katelyn Rohan', disabled: false },
]
const peopleOptions = $(computed(() => {
  return people.map((person: any) => {
    return {
      value: person.id,
      label: person.name,
      disabled: person.disabled,
    }
  })
}))
const selectedPerson = ref<SelectItem | null>()
</script>

<template>
  <div>
    <h1>
      {{ $route.name }}
    </h1>
    <div
      my-8
      flex
      items-center
      gap-3
    >
      <FButton
        :loading="loading"
        @click="loading = true"
      >
        Add
      </FButton>
      <FButton
        variant="danger"
        uppercase
        @click="loading = false"
      >
        stop
      </FButton>
      <FButton
        icon="tabler:hand-stop"
        circle
        icon-only
        variant="secondary"
        :loading="loading"
        @click="loading = false"
      />
      <FSelectField
        v-model="selectedPerson"
        :items="peopleOptions"
      />
    </div>
  </div>
</template>
