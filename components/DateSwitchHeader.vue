<script setup lang="ts">
const dateRange = useDateRangeStore()
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
          @click="dateRange.setPreviousMonth"
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
          {{ dateRange.formattedDate }}
        </p>
      </div>
    </div>
    <div
      v-if="!dateRange.isLatestMonth"
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
          @click="dateRange.setToToday"
        />
      </FTooltip>
      <FTooltip content="Next month" placement="bottom">
        <FButton
          icon-only
          circle
          size="lg"
          variant="secondary"
          icon="tabler:arrow-right"
          @click="dateRange.setNextMonth"
        />
      </FTooltip>
    </div>
  </div>
</template>
