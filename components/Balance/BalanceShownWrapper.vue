<script lang="ts" setup>
const { isAllTime, isCurrentMonth } = toRefs(useDateRangeStore())

const showMonthly = computed(() => !isCurrentMonth.value && !isAllTime.value)
</script>

<template>
  <div flex items-center gap-8>
    <slot name="current" />

    <div v-if="showMonthly" pl-8 border="l-2 zinc-2 dark:zinc-8">
      <slot name="old" />
    </div>
  </div>
</template>
