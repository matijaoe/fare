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
  <div grid="~ cols-[100px_1fr_100px]" w-full>
    <div w-fit flex gap-2>
      <template v-if="!isAllTime">
        <FTooltip v-if="!isAllTime" content="Previous month" placement="top">
          <FButton
            icon-only
            circle
            size="md"
            variant="secondary"
            icon="tabler:arrow-left"
            @click="setPreviousMonth"
          />
        </FTooltip>
        <FTooltip
          v-if="!isLatestMonth && !isAllTime"
          content="Next month"
          placement="top"
        >
          <FButton
            icon-only
            circle
            size="md"
            variant="secondary"
            icon="tabler:arrow-right"
            @click="setNextMonth"
          />
        </FTooltip>
      </template>
    </div>

    <div flex justify-center h-full gap-2>
      <FTooltip
        content="Click to refresh"
        placement="top"
      >
        <FButton
          variant="primary"
          circle
          size="md"
          :icon="isAllTime ? 'tabler:timeline' : 'tabler:calendar'"
          keep-style-on-load
          min-w="!36"
          @click="query.refetch()"
        >
          <p font="display medium" uppercase class="translate-y-0.2">
            {{ isAllTime ? 'All time' : formattedDate }}
          </p>
        </FButton>
      </FTooltip>
    </div>
    <div flex justify-self-end gap-2>
      <FTooltip
        v-if="!isAllTime"
        content="All time"
        placement="top"
      >
        <FButton
          icon-only
          circle
          size="md"
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
          size="md"
          variant="primary"
          icon="tabler:calendar"
          @click="setToToday"
        />
      </FTooltip>
    </div>
  </div>
</template>
