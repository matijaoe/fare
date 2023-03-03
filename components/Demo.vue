<script setup lang="ts">
import type { SelectItemDefault } from '~~/models/ui'

const loading = ref(false)
const toggleLoading = useToggle(loading)

const address = ref('bestovje')
const pw = ref('hunter32')

const people = [
  { id: 1, name: 'Durward Reynolds', disabled: false },
  { id: 2, name: 'Kenton Towne', disabled: false },
  { id: 3, name: 'Therese Wunsch Ani Stazija', disabled: false },
  { id: 4, name: 'Benedict Kessler', disabled: true },
  { id: 5, name: 'Katelyn Rohan', disabled: false },
]
const peopleOptions = $(computed(() =>
  people.map((person: any) => ({
    value: person.id,
    label: person.name,
    disabled: person.disabled,
  })),
))
const selectedPerson = ref<SelectItemDefault | null>()
</script>

<template>
  <div flex="~ col sm:row gap-4">
    <FCard>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, vero iure harum eaque molestias et.
    </FCard>
    <FCard white>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, vero iure harum eaque molestias et.
    </FCard>
    <FCard filled>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, vero iure harum eaque molestias et.
    </FCard>
  </div>
  <div
    flex
    flex-col
    gap-3
    mt-5
  >
    <FSelectField
      v-model="selectedPerson"
      hint="Your favorite person"
      icon="tabler:cookie"
      label="Person"
      :items="peopleOptions"
    />
    <FTextarea
      label="Komentar"
      hint="This is a hint"
      icon="tabler:cookie"
      icon-placement="left"
      placeholder="Komentar"
    />

    <div class="flex gap-2">
      <div
        flex-1
        flex
        gap-2
        items-center
      >
        <form>
          <FPasswordField v-model="pw" :loading="loading" flex-1 />
        </form>
        <FButton
          variant="primary"
          @click="toggleLoading()"
        >
          test
        </FButton>
      </div>
      <FInput
        v-model="address"
        flex-1
        icon="tabler:id"
        icon-placement="left"
        :loading="loading"
        disabled
      />
    </div>

    <div flex gap-3>
      <FInput
        v-model="address"
        hint="napravi kajgod"
        label="Address"
        icon="tabler:id"
        icon-placement="left"
        :loading="loading"
      />
      <FInput
        icon="tabler:check"
        label="Address"
        icon-placement="left"
        :loading="loading"
        positive
      >
        <template #label>
          <div flex items-center gap-1>
            <Icon name="tabler:alarm" /> labela
          </div>
        </template>
        <template #hint>
          <div flex items-center gap-1>
            ovo je moj hint <Icon name="tabler:check" />
          </div>
        </template>
      </FInput>
      <FInput
        icon="tabler:id"
        label="Address"
        icon-placement="left"
        :loading="loading"
        invalid
        error="This is required"
      >
        <template #label>
          <div
            flex
            items-center
            gap-1
            capitalize
          >
            <Icon name="tabler:alarm" /> labela
          </div>
        </template>
      </FInput>
    </div>
  </div>
  <div
    flex
    flex-col
    gap-2
    items-start
  >
    <h1 mt-4>
      Large
    </h1>
    <!-- Large -->
    <div
      flex
      gap-2
      w-full
      flex-wrap
    >
      <FButton
        variant="primary"
        size="lg"
        icon="tabler:play"
        icon-placement="right"
        @click="address = 'krapina'"
      >
        change address
      </FButton>
    </div>

    <div
      grid
      grid-cols-3
      gap-4
    >
      <!-- Medium -->
      <div
        flex
        flex-col
        gap-2
        items-start
      >
        <h1 mt-4>
          Medium
        </h1>
        <FButton variant="primary" icon="tabler:cookie">
          Eat
        </FButton>
        <FButton
          variant="secondary"
          icon="tabler:edit"
          icon-placement="right"
        >
          Edit
        </FButton>
        <FButton variant="subtle">
          <template #left>
            <Icon name="tabler:archive" />
          </template>
          Archive
        </FButton>
        <FButton variant="outline" icon="tabler:info-circle">
          Info
        </FButton>
        <FButton variant="danger">
          Discard
        </FButton>
        <FButton variant="warning" icon="tabler:error-404">
          Warning
        </FButton>
        <FButton variant="success">
          Apply
        </FButton>
      </div>

      <!-- small -->
      <div
        flex
        flex-col
        gap-2
        items-start
      >
        <h1 mt-4>
          Small
        </h1>
        <FButton variant="primary" size="sm" loading>
          Play
        </FButton>
        <FButton variant="secondary" size="sm" loading>
          Calculate
        </FButton>
        <FButton variant="subtle" size="sm" loading>
          Export
        </FButton>
        <FButton
          variant="outline"
          size="sm"
          loading
          icon="tabler:clipboard"
        >
          Copy
        </FButton>
        <FButton
          variant="danger"
          size="sm"
          loading
        >
          Discard
        </FButton>
        <FButton variant="warning" size="sm" loading>
          Warning
        </FButton>
        <FButton variant="success" size="sm" loading>
          Apply
        </FButton>
      </div>
    </div>
    <div
      flex
      gap-4
      items-center
      mt-8
    >
      <FButton
        variant="primary"
        icon="tabler:cookie"
        icon-only
        size="lg"
      />
      <FButton
        variant="success"
        icon="tabler:cookie"
        icon-only
        circle
        size="lg"
      />
      <FButton
        variant="secondary"
        icon="tabler:id"
        circle
        size="lg"
        icon-placement="right"
        casing="none"
      >
        ID
      </FButton>
    </div>
  </div>
</template>
