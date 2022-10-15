<script setup lang="ts">
import type { CashAccountWithTotals } from '~~/models/resources/account'

type Props = {
  cashAccount: CashAccountWithTotals
  allTime?: boolean
}

const props = defineProps<Props>()

const cashAccountStore = useCashAccountModal()

const { colorSolidBg, colorDotText } = useAppColors(props.cashAccount.account.color)

const account = $computed(() => props.cashAccount.account)
const totals = $computed(() => props.cashAccount.totals)

const formattedBalance = useCurrencyFormat(totals.balance)
const formattedCashflow = useCurrencyFormat(totals.net, { signDisplay: 'always' })
const formattedIncome = useCurrencyFormat(totals.income, { signDisplay: 'always' })
const formattedExpense = useCurrencyFormat(-totals.expense)

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

const { isDark } = useColorscheme()
</script>

<template>
  <FCard
    ref="card"
    overflow-hidden
    :white="!isDark"
    :filled="isDark"
    paddingless
    aspect="2/1 sm:4/3"
    flex="~ col"
    relative
    group
  >
    <div p-4 flex="1 ~ col">
      <div
        flex
        justify-between
        items-center
        w-full
      >
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
          <p
            z-2
            font="display medium"
            uppercase
            text-base
          >
            {{ account.name }}
          </p>
        </div>

        <div>
          <button @click.stop="cashAccountStore.launch(account)">
            <Icon v-show="isHovered" text="zinc-5 dark:zinc-5" name="tabler:edit" />
          </button>
        </div>
      </div>

      <div
        class="-mb-2"
        flex="1 ~ col gap-1"
        justify-center
        relative
        z-2
        text-center
      >
        <FTooltip mx-auto placement="right" content="Balance">
          <div
            font="display medium"
            uppercase
            text-4xl
          >
            {{ formattedBalance }}
          </div>
        </FTooltip>
        <FTooltip mx-auto placement="right" content="Cashflow">
          <p
            gap-0
            flex
            flex-col
            font-mono
            text="base zinc-4 dark:zinc-5"
          >
            {{ formattedCashflow }}
          </p>
        </FTooltip>
      </div>
    </div>

    <div
      mt-auto
      z-2
      grid="~ cols-2"
      border="base dark:zinc-7 t-dashed t-2"
      text-center
      relative
      text="lg"
    >
      <div
        z-2
        py-4
        border="base dark:zinc-7 r-dashed r-1"
        w-full
        flex="~ col"
      >
        <div
          flex="~ col"
          translate-y="0.4"
        >
          <p
            uppercase
            font="medium"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="allTime">Total earned</span>
            <span v-else>Earned this month</span>
          </p>
          <span font-mono>{{ formattedIncome }}</span>
        </div>
      </div>
      <div
        z-2
        py-4
        border="base dark:zinc-7 l-dashed l-1"
        w-full
      >
        <div
          flex="~ col"
          translate-y="0.4"
        >
          <p
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="allTime">Total spent</span>
            <span v-else>spent this month</span>
          </p>
          <span font-mono>{{ formattedExpense }}</span>
        </div>
      </div>
    </div>
  </FCard>
</template>
