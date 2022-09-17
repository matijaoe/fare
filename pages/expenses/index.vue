<script lang="ts" setup>
import { set } from '@vueuse/core'
import dayjs from 'dayjs'

const shownDate = ref(dayjs())

const setPreviousMonth = () => set(shownDate, shownDate.value.subtract(1, 'month'))
const setToToday = () => set(shownDate, dayjs())
const setNextMonth = () => set(shownDate, shownDate.value.add(1, 'month'))

const isLatestMonth = computed(() =>
  shownDate.value.isSame(dayjs(), 'month'),
)

const formattedDate = computed(() =>
  shownDate.value.format('MMMM YYYY'),
)
</script>

<template>
  <LayoutPageWrapper>
    <div
      grid
      grid-cols-3
      w-full
      mb-8
    >
      <FButton
        class="justify-self-start"
        icon-only
        circle
        size="lg"
        variant="secondary"
        icon="tabler:arrow-left"
        @click="setPreviousMonth"
      />
      <div flex="center gap-2" text="xl">
        <Icon name="tabler:calendar" class="opacity-80" />
        <p font="medium">
          {{ formattedDate }}
        </p>
      </div>
      <div
        v-if="!isLatestMonth"
        class="justify-self-end"
        flex
        gap-3
      >
        <FButton
          icon-only
          circle
          size="lg"
          variant="primary"
          icon="tabler:calendar"
          @click="setToToday"
        />
        <FButton
          icon-only
          circle
          size="lg"
          variant="secondary"
          icon="tabler:arrow-right"
          @click="setNextMonth"
        />
      </div>
    </div>

    <div grid grid-cols-3 gap-4>
      <FCard
        flex
        justify-center
        text-xl
        uppercase
        class="!py-20"
        white
      >
        Income
      </FCard>
      <FCard
        flex
        justify-center
        text-xl
        uppercase
        class="!py-20"
        filled
      >
        Expense
      </FCard>
      <FCard
        flex
        justify-center
        text-xl
        uppercase
        class="!py-20"
      >
        Transfer
      </FCard>
    </div>
    <div
      w-full
      flex="~ col lg:row"
      justify-between
      gap-8
      mt-8
    >
      <div
        class="justify-self-end"
        text="right"
        max-w="full sm:md"
        flex-1
      >
        <LedgerEntriesList />
      </div>
      <div flex-1>
        Filters
      </div>
    </div>
  </LayoutPageWrapper>
</template>
