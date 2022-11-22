<script lang="ts" setup>
const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())
const { data: totals, isLoading } = useTransactionTotalsPerRange(rangeFrom, rangeTo)

const net = computed(() => totals.value?.net ?? 0)
const expense = computed(() => isDefined(totals) ? -totals.value.expense : 0)
const income = computed(() => totals.value?.income ?? 0)

const formattedNet = useCurrencyFormat(net, { signDisplay: 'exceptZero' })
const formattedExpense = useCurrencyFormat(expense, { signDisplay: 'exceptZero' })
const formattedIncome = useCurrencyFormat(income, { signDisplay: 'exceptZero' })
</script>

<template>
  <div flex items-center justify-between gap-4>
    <div flex items-center gap-5>
      <div
        flex-center flex-shrink-0
        text-2xl p-4 rounded-full ring="2 offset 2 current" transition
        :class="{
          'bg-stone-2 text-stone-9': isLoading || net === 0,
          'bg-green-1 text-green-9': net > 0,
          'bg-red-1 text-red-9': net < 0,
        }"
      >
        <TransitionFade>
          <FLoader v-if="isLoading" />
          <Icon v-else-if="net > 0" name="tabler:trending-up" />
          <Icon v-else-if="net < 0" name="tabler:trending-down" />
          <Icon v-else name="tabler:equal" />
        </TransitionFade>
      </div>

      <div space-y-1 flex-1>
        <span uppercase font="sans medium" text="xs zinc-4 dark:zinc-5">
          Cashflow
        </span>

        <div flex items-center gap-5>
          <TransitionFade>
            <FSkeleton
              v-if="isLoading"
              class="h-40px w-50"
            />
            <p
              v-else-if="isDefined(totals)"
              text-4xl font="display medium"
            >
              {{ net > 0 ? '+' : '' }}{{ formattedNet }}
            </p>
          </TransitionFade>
        </div>
      </div>
    </div>

    <div flex justify-center items-end gap-8 divide-x-2 font-mono>
      <FTooltip content="Income" placement="top-end">
        <div flex items-center gap-4>
          <div text-lg text-right space-y="0.5">
            <TransitionFade>
              <FSkeleton v-if="isLoading" w-22 h="28px" />
              <span
                v-else-if="isDefined(totals)"
                flex items-center
              >
                {{ net > 0 ? '+' : '' }}{{ formattedIncome }}
              </span>
            </TransitionFade>
          </div>

          <div
            bg-stone-1 text-stone-9
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
            <TransitionFade>
              <FSkeleton v-if="isLoading" w-22 h="28px" />
              <span v-else-if="isDefined(totals)">
                {{ formattedExpense }}
              </span>
            </TransitionFade>
          </div>

          <div
            bg-stone-1 text-stone-9
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
