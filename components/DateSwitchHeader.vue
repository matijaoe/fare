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
</script>

<template>
  <div flex="~ gap-2 justify-center" md:grid="~ cols-[100px_1fr_100px] gap-0" w-full bg-base>
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

    <div flex justify-center h-full gap-2 flex-1 w-full>
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
          min-w="w-full md:!36"
        >
          <p font="display medium" uppercase class="translate-y-0.2">
            {{ isAllTime ? 'All time' : formattedDate }}
          </p>
        </FButton>
      </FTooltip>
    </div>

    <div flex justify-self-end gap-2>
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

      <FTooltip
        :content="isAllTime ? 'Monthly view' : 'All time'"
        placement="top"
      >
        <FButton
          icon-only
          circle
          size="md"
          :variant="isAllTime ? 'indigo' : 'outline'"
          icon="tabler:timeline"
          @click="setAllTime(!isAllTime)"
        />
      </FTooltip>
    </div>
  </div>
</template>
