<script lang="ts" setup>
const { monthQuery } = toRefs(useDateRangeStore())
const { data: totals, isLoading } = useTransactionTotalsPerRange(monthQuery)

const net = computed(() => totals.value?.net ?? 0)
const expense = computed(() => totals.value?.expense ?? 0)
const income = computed(() => totals.value?.income ?? 0)

const formattedNet = useCurrencyFormat(net, { signDisplay: 'always' })
const formattedExpense = useCurrencyFormat(expense)
const formattedIncome = useCurrencyFormat(income)
</script>

<template>
  <div flex items-center justify-between gap-4>
    <div flex items-center gap-5>
      <div
        flex-center flex-shrink-0
        transition
        text-2xl p-4 rounded-full  
        ring="2 offset-2 dark:(0 offset-0)" 
        :class="{
          'bg-zinc-2 ring-zinc-8 dark:text-zinc-9 dark:filter-saturate-70': isLoading || net === 0,
          'bg-emerald-4 ring-emerald-2 !ring-offset--1 !ring-5 dark:text-white dark:filter-saturate-70': net > 0,
          'bg-rose-4 ring-rose-2 !ring-offset--1 !ring-5 dark:text-white dark:filter-saturate-70': net < 0,
        }"
      >
        <FLoader v-if="isLoading" />
        <Icon v-else-if="net > 0" name="tabler:trending-up" />
        <Icon v-else-if="net < 0" name="tabler:trending-down" />
        <Icon v-else name="tabler:equal" />
      </div>

      <div space-y-1 flex-1>
        <span uppercase font="sans medium" text="xs zinc-4 dark:zinc-5">
          Cashflow
        </span>

        <div flex items-center gap-5>
          <FSkeleton
            v-if="isLoading"
            class="h-40px w-50"
          />
          <p
            v-else-if="isDefined(totals)"
            text-4xl font="display medium"
          >
            {{ formattedNet }}
          </p>
        </div>
      </div>
    </div>

    <div flex justify-center items-end gap-8 divide-x-2 divide-zinc-2 dark:divide-zinc-8 font-mono>
      <FTooltip content="Income" placement="top-end">
        <div flex items-center gap-4>
          <div text-lg text-right space-y="0.5">
            <FSkeleton v-if="isLoading" w-22 h="28px" />
            <span
              v-else-if="isDefined(totals)"
              flex items-center
            >
              {{ formattedIncome }}
            </span>
          </div>

          <div
            bg-emerald-2 text-emerald-9
            ring="2 offset 2 current"
            flex-center flex-shrink-0
            p-2 rounded-full aspect-square
          >
            <Icon name="tabler:arrow-down-left" sm />
          </div>
        </div>
      </FTooltip>

      <FTooltip content="Expenses" placement="top-end">
        <div flex items-center gap-4 pl-5>
          <div text="lg right" space-y="0.5">
            <FSkeleton v-if="isLoading" w-22 h="28px" />
            <span v-else-if="isDefined(totals)">
              {{ formattedExpense }}
            </span>
          </div>

          <div
            bg-rose-2 text-rose-9
            ring="2 offset 2 current"
            flex-center flex-shrink-0
            p-2 rounded-full aspect-square
          >
            <Icon name="tabler:arrow-up-right" sm />
          </div>
        </div>
      </FTooltip>
    </div>
  </div>
</template>
