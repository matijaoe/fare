<script lang="ts" setup>
import { addMonths, format } from 'date-fns'

defineProps<{
  data: {
    total: number
    totalCash: number
    compoundedNestEgg: number
    earnedPureInterest: number
    months: number
  }
}>()
</script>

<template>
  <FCard
    filled
  >
    <div flex justify-between items-start>
      <div flex flex-col gap-4>
        <div font-display font-medium text-3xl>
          {{ formatCurrency(data.total) }}
        </div>

        <div flex items-center gap-4 divide-x-1 divide-zinc-3 dark:zinc-7>
          <div>
            <BasicLabel size="xs">
              Nest egg
            </BasicLabel>
            <div font-mono text-display>
              {{ formatCurrency(data.compoundedNestEgg) }}
            </div>
          </div>
          <div pl-4>
            <BasicLabel size="xs">
              Cash
            </BasicLabel>
            <div font-mono text-display>
              {{ formatCurrency(data.totalCash) }}
            </div>
          </div>
        </div>
      </div>

      <div flex items-center gap-2 divide-x-1 divide-stone-3 text-sm>
        <div>
          <template v-if="(data.months > 0)">
            in {{ monthsToYears(data.months) }} {{ handlePlural(monthsToYears(data.months), 'year') }}
          </template>
          <template v-else>
            now
          </template>
        </div>
        <time pl-2 font-medium w="44px">
          {{ format(addMonths(new Date(), data.months), 'yyyy') }}
        </time>
      </div>
    </div>
  </FCard>
</template>
