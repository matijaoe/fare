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
const {
  pending,
  refresh,
} = toRefs(useTransactionsStore())
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
        <FTooltip
          v-if="!isLatestMonth"
          content="Next month"
          placement="bottom"
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
      <FButton
        variant="primary"
        circle
        size="lg"
        :icon="isAllTime ? 'tabler:timeline' : 'tabler:calendar'"
        :loading="pending"
        keep-style-on-load
        min-w="!36"
        @click="refresh"
      >
        <p font="display" class="translate-y-0.2">
          {{ isAllTime ? 'All time' : formattedDate }}
        </p>
      </FButton>
    </div>
    <div
      class="justify-self-end"
      flex
      gap-3
    >
      <FTooltip
        v-if="!isAllTime"
        content="All time"
        placement="bottom"
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
        placement="bottom"
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
