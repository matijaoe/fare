<script setup lang="ts">
import type { CashAccountWithTotals } from '~~/models/resources/account'

type Props = {
  cashAccount: CashAccountWithTotals
  allTime?: boolean
}

const props = defineProps<Props>()

const { colorSolidBg, colorDotText } = useAppColors(props.cashAccount.account.color)

const account = $computed(() => props.cashAccount.account)
const totals = $computed(() => props.cashAccount.totals)

const formattedBalance = useCurrencyFormat(totals.balance)
const formattedCashflow = useCurrencyFormat(totals.net, { signDisplay: 'always' })
const formattedIncome = useCurrencyFormat(totals.income, { signDisplay: 'always' })
const formattedExpense = useCurrencyFormat(-totals.expense)
</script>

<template>
  <FCard
    overflow-hidden
    white
    paddingless
    aspect="2/1 sm:4/3"
    flex="~ col"
    relative
  >
    <div p-4 flex="1 ~ col">
      <div
        flex
        items-center
        gap-4
      >
        <div
          rounded-full
          :class="[colorSolidBg]"
          w-10
          h-10
          flex-center
          absolute
          top--4
          left--4
          class="transform origin-center scale-800 sm:scale-600 dark:opacity-25"
        />
        <Icon :name="account.icon" :class="[colorDotText]" z-2 />
        <p z-2 font="display">
          {{ account.name }}
        </p>
      </div>

      <div
        class="-mb-2"
        flex="1 ~ col gap-1.5"
        justify-center
        relative
        z-2
        text-center
        font-mono
      >
        <div
          text="3xl"
        >
          {{ formattedBalance }}
        </div>
        <div text="sm zinc-4 dark:zinc-5">
          <p>
            <span>
              {{ formattedCashflow }} {{ allTime ? 'total' : 'this month' }}
            </span>
          </p>
        </div>
      </div>
    </div>

    <div
      mt-auto
      z-2
      grid="~ cols-2"
      border="base dark:zinc-7 t-dashed t-2"
      text-center
      relative
      bg="white dark:zinc-8"
      text="lg"
    >
      <div
        z-2
        py-4
        border="base dark:zinc-7 r-dashed r-1"
        w-full
        font="mono"
        flex="~ col"
      >
        <div
          flex="~ col"
          translate-y="0.4"
        >
          <p
            uppercase
            font="sans semibold"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="allTime">Total earned</span>
            <span v-else>Earned this month</span>
          </p>
          {{ formattedIncome }}
        </div>
      </div>
      <div
        z-2
        py-4
        border="base dark:zinc-7 l-dashed l-1"
        w-full
        font="mono"
      >
        <div
          flex="~ col"
          translate-y="0.4"
        >
          <p
            uppercase
            font="sans semibold"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="allTime">Total spent</span>
            <span v-else>spent this month</span>
          </p>
          {{ formattedExpense }}
        </div>
      </div>
    </div>
  </FCard>
</template>
