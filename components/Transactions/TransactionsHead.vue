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
      <div text-2xl flex-center>
        <div
          v-if="isLoading"
          p-3
          bg-stone-2
          text-stone-9
          rounded-full
          ring="2 offset 2 current"
          flex-center
          flex-shrink-0
        >
          <FLoader />
        </div>
        <template v-else>
          <div
            v-if="net > 0"
            order-2
            bg-green-1
            text-green-9
            p-3
            ring="2 offset 2 current"
            rounded-full
            flex-center
            flex-shrink-0
          >
            <Icon name="tabler:trending-up" />
          </div>
          <div
            v-else-if="net < 0"
            order-2
            bg-red-1
            text-red-9
            p-3
            ring="2 offset 2 current"
            rounded-full
            flex-center
            flex-shrink-0
          >
            <Icon name="tabler:trending-down" />
          </div>
          <div
            v-else
            bg-stone-2
            text-stone-9
            p-3
            ring="2 offset 2 current"
            rounded-full
            flex-center
            flex-shrink-0
          >
            <Icon name="tabler:equal" />
          </div>
        </template>
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
          text-4xl
          font="display medium"
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
            <h4 v-else-if="isDefined(totals)">
              {{ net > 0 ? '+' : '' }}{{ formattedNet }}
            </h4>
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
