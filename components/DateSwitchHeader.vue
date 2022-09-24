<script setup lang="ts">
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
  <div
    grid="~ cols-[100px_1fr_100px]"
    w-full
  >
    <div w-fit>
      <FTooltip content="Previous month" placement="bottom">
        <FButton
          icon-only
          circle
          size="lg"
          variant="secondary"
          icon="tabler:arrow-left"
          @click="setPreviousMonth"
        />
      </FTooltip>
    </div>
    <div flex="center" h-full>
      <div
        h-full
        flex="center gap-2"
        text="zinc-2 dark:zinc-8 base sm:lg"
        rounded-full
        p="l-5 r-6"
        bg="zinc-8 dark:zinc-3"
      >
        <Icon name="tabler:calendar" text="zinc-3 dark:zinc-7" />
        <p font="display" class="translate-y-0.2">
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
      <FTooltip content="Current month" placement="bottom">
        <FButton
          icon-only
          circle
          size="lg"
          variant="primary"
          icon="tabler:calendar"
          @click="setToToday"
        />
      </FTooltip>
      <FTooltip content="Next month" placement="bottom">
        <FButton
          icon-only
          circle
          size="lg"
          variant="secondary"
          icon="tabler:arrow-right"
          @click="setNextMonth"
        />
      </FTooltip>
    </div>
  </div>
</template>
