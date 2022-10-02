<script setup lang="ts">
// const store = useDateRangeDayjsStore()
const store = useDateRangeStore()
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
      <template v-if="!store.isAllTime">
        <FTooltip content="Previous month" placement="bottom">
          <FButton
            icon-only
            circle
            size="lg"
            variant="secondary"
            icon="tabler:arrow-left"
            @click="store.setPreviousMonth"
          />
        </FTooltip>
        <FTooltip
          v-if="!store.isLatestMonth"
          content="Next month"
          placement="bottom"
        >
          <FButton
            icon-only
            circle
            size="lg"
            variant="secondary"
            icon="tabler:arrow-right"
            @click="store.setNextMonth"
          />
        </FTooltip>
      </template>
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
          {{ store.isAllTime ? 'All time' : store.formattedDate }}
        </p>
      </div>
    </div>
    <div
      class="justify-self-end"
      flex
      gap-3
    >
      <FTooltip
        v-if="!store.isAllTime"
        content="All time"
        placement="bottom"
      >
        <FButton
          icon-only
          circle
          size="lg"
          variant="outline"
          icon="tabler:timeline"
          @click="store.setAllTime(true)"
        />
      </FTooltip>
      <FTooltip
        v-if="store.isAllTime || !store.isLatestMonth"
        content="Current month"
        placement="bottom"
      >
        <FButton
          icon-only
          circle
          size="lg"
          variant="primary"
          icon="tabler:calendar"
          @click="store.setToToday"
        />
      </FTooltip>
    </div>
  </div>
</template>
