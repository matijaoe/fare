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
  <div
    grid
    grid-cols="[260px_1fr_260px]"
    gap-4
  >
    <div flex items-center gap-5>
      <div
        text-2xl
        p-4
        ring="2 offset 2 current"
        rounded-full
        flex-center
        flex-shrink-0
        transition
        :class="{
          'bg-stone-2 text-stone-9': isLoading || net === 0,
          'bg-green-2 text-green-9': net > 0,
          'bg-red-2 text-red-9': net < 0,
        }"
      >
        <TransitionFade>
          <FLoader v-if="isLoading" />
          <Icon v-else-if="net > 0" name="tabler:trending-up" />
          <Icon v-else-if="net < 0" name="tabler:trending-down" />
          <Icon v-else name="tabler:equal" />
        </TransitionFade>
      </div>

      <div space-y-1>
        <span
          uppercase
          font="sans medium"
          text="xs zinc-4 dark:zinc-5"
        >
          Cashflow
        </span>

        <div

          flex
          items-center
          gap-5
        >
          <TransitionFade>
            <div
              v-if="isLoading"
              flex
              gap-4
              items-center
              class="color-base-lighter"
              h-full
            >
              <FSkeleton class="h-40px w-50" />
            </div>
            <p
              v-else-if="isDefined(totals)"
              text-4xl
              font="display medium"
            >
              {{ net > 0 ? '+' : '' }}{{ formattedNet }}
            </p>
          </TransitionFade>
        </div>
      </div>
    </div>

    <div
      class="translate-y--1"
      grid
      grid-cols-2
      items-center
      mt-5
      justify-center
      font-mono
    >
      <div
        flex
        items-center
        justify-end
        gap-6
      >
        <div
          order-2
          bg-green-1
          text-green-9
          p-2
          ring="2 offset 2 current"
          rounded-full
          aspect-square
          flex-center
          flex-shrink-0
        >
          <Icon name="tabler:arrow-down-left" text-2xl />
        </div>

        <div space-y="0.5">
          <p
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            leading-tight
            text-right
          >
            Earned
          </p>
          <div text-2xl text-right>
            <TransitionFade>
              <FSkeleton v-if="isLoading" w-22 h="32px" />
              <span
                v-else-if="isDefined(totals)"
                flex
                items-center
              >
                {{ net > 0 ? '+' : '' }}{{ formattedIncome }}
              </span>
            </TransitionFade>
          </div>
        </div>
      </div>

      <div
        flex
        items-center
        justify-start
        gap-6
      >
        <div
          bg-stone-2
          text-stone-9
          p-2
          ring="2 offset 2 current"
          rounded-full
          flex-center
          flex-shrink-0
        >
          <Icon name="tabler:arrow-up-right" text-2xl />
        </div>

        <div space-y="0.5">
          <p
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            leading-tight
          >
            Spent
          </p>
          <div text-2xl>
            <TransitionFade>
              <FSkeleton v-if="isLoading" w-22 h="32px" />
              <span v-else-if="isDefined(totals)">
                {{ formattedExpense }}
              </span>
            </TransitionFade>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
