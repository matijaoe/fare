<script lang="ts" setup>
const { isAllTime, isCurrentMonth } = toRefs(useDateRangeStore())

const showMonthly = computed(() => !isCurrentMonth.value && !isAllTime.value)
</script>

<template>
  <div flex flex-col md:flex-row md:items-center gap-5 md:gap-8>
    <slot name="current" />

    <div v-if="showMonthly" md:pl-8 md:border="l-2 zinc-2 dark:zinc-8">
      <slot name="old" />
    </div>
  </div>
</template>
