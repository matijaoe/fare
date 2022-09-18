<script lang="ts" setup>
import { set } from '@vueuse/core'
import dayjs from 'dayjs'

const shownDate = ref(dayjs())

const { smUp } = useBreakpoints()

const setPreviousMonth = () => set(shownDate, shownDate.value.subtract(1, 'month'))
const setToToday = () => set(shownDate, dayjs())
const setNextMonth = () => set(shownDate, shownDate.value.add(1, 'month'))

const isLatestMonth = computed(() =>
  shownDate.value.isSame(dayjs(), 'month'),
)

const formattedDate = computed(() => {
  const date = shownDate.value
  const isCurrentYear = date.isSame(dayjs(), 'year')
  return date.format(isCurrentYear ? 'MMMM' : 'MMMM YYYY')
})
</script>

<template>
  <LayoutPageWrapper>
    <div
      grid="~ cols-[100px_1fr_100px]"
      w-full
      mb-8
    >
      <FButton
        class="justify-self-start"
        icon-only
        circle
        size="md"
        variant="secondary"
        icon="tabler:arrow-left"
        @click="setPreviousMonth"
      />
      <div flex="center" h-full>
        <div
          h-full
          flex="center gap-2"
          text="zinc-2 sm:base"
          border="zinc-9 2 rounded-full"
          bg-zinc-9
          px-4
        >
          <Icon name="tabler:calendar" text="zinc-4" />
          <p font="medium">
            {{ formattedDate }}
          </p>
        </div>
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
          size="md"
          variant="primary"
          icon="tabler:calendar"
          @click="setToToday"
        />
        <FButton
          icon-only
          circle
          size="md"
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
      flex="~ col md:row"
      justify-between
      gap-8
      mt-8
    >
      <div
        max-w="full sm:base md:lg lg:2xl"
        flex-1
      >
        <LedgerEntriesList redesign />
      </div>
      <div
        text="right"
        flex-1
      >
        <!-- <LedgerEntriesList /> -->
        Filters
      </div>
    </div>
  </LayoutPageWrapper>
</template>
