<script setup lang="ts">
const {
  isAllTime,
  isLatestMonth,
  setAllTime,
  setNextMonth,
  setPreviousMonth,
  setToToday,
  formattedDate,
} = toRefs(useDateRangeStore())

const { query } = toRefs(useTransactionsStore())
</script>

<template>
  <div
    grid="~ cols-[100px_1fr_100px]"
    w-full
  >
    <div
      w-fit
      flex
      gap-3
    >
      <template v-if="!isAllTime">
        <FTooltip content="Previous month" placement="top">
          <FButton
            icon-only
            circle
            size="lg"
            variant="secondary"
            icon="tabler:arrow-left"
            @click="setPreviousMonth"
          />
        </FTooltip>
        <FTooltip
          v-if="!isLatestMonth"
          content="Next month"
          placement="top"
        >
          <FButton
            icon-only
            circle
            size="lg"
            variant="secondary"
            icon="tabler:arrow-right"
            @click="setNextMonth"
          />
        </FTooltip>
      </template>
    </div>
    <div flex="center" h-full>
      <FTooltip
        content="Click to refresh"
        placement="top"
      >
        <FButton
          variant="primary"
          circle
          size="lg"
          :icon="isAllTime ? 'tabler:timeline' : 'tabler:calendar'"
          keep-style-on-load
          min-w="!40"
          @click="query.refetch()"
        >
          <p font="display medium" uppercase class="translate-y-0.2">
            {{ isAllTime ? 'All time' : formattedDate }}
          </p>
        </FButton>
      </FTooltip>
    </div>
    <div
      class="justify-self-end"
      flex
      gap-3
    >
      <FTooltip
        v-if="!isAllTime"
        content="All time"
        placement="top"
      >
        <FButton
          icon-only
          circle
          size="lg"
          variant="outline"
          icon="tabler:timeline"
          @click="setAllTime(true)"
        />
      </FTooltip>
      <FTooltip
        v-if="isAllTime || !isLatestMonth"
        content="Current month"
        placement="top"
      >
        <FButton
          icon-only
          circle
          size="lg"
          variant="primary"
          icon="tabler:calendar"
          @click="setToToday"
        />
      </FTooltip>
    </div>
  </div>
</template>
