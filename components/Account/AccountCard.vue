<script setup lang="ts">
import type { AccountTotals, CashAccountWithAccount } from '~~/models/resources/account'
type Props = {
  cashAccount: CashAccountWithAccount
  totals?: AccountTotals
  totalsLoading?: boolean
  allTime?: boolean
}

const props = defineProps<Props>()
const cashAccountStore = useCashAccountModal()

const { colorSolidBg, colorDotText } = useAppColors(props.cashAccount.account.color)

const account = $computed(() => props.cashAccount.account)
const totals = $computed(() => props.totals)

const formattedBalance = totals?.balance != null ? useCurrencyFormat(totals.balance) : '€XXX.XX'
const formattedCashflow = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'always' }) : '€XXX.XX'
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income, { signDisplay: 'always' }) : '€XXX.XX'
const formattedExpense = totals?.expense != null ? useCurrencyFormat(-totals.expense) : '€XXX.XX'

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

const { isDark } = useTheme()
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
            class="transform origin-center scale-1000 filter-saturate-80 opacity-80 sm:scale-600 dark:opacity-25"
          />
          <div
            flex
            items-center
            justify-start
            min-w-5
          >
            <Icon
              :name="account.icon ?? 'tabler:cash'"
              :class="[colorDotText]"
              z-2
            />
          </div>
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
          <FTooltip content="Edit" placement="top">
            <button @click.stop="cashAccountStore.launch(account)">
              <Icon v-show="isHovered" text="zinc-6 dark:zinc-5" name="tabler:edit" />
            </button>
          </FTooltip>
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
            <FLoader v-if="totalsLoading" />
            <span v-else-if="totals">
              {{ formattedBalance }}
            </span>
          </div>
        </FTooltip>
        <FTooltip mx-auto placement="right" content="Cashflow">
          <p
            flex
            flex-col
            font-mono
            font-medium
            text="sm zinc-4 dark:zinc-5"
          >
            <span
              v-if="totals && !totalsLoading"
              class="filter-saturate-90"
              :class="{
                'px-2 py-1 text-white rounded-md': totals.net !== 0,
                'bg-red-1 text-red-7': totals.net < 0,
                'bg-emerald-1 text-emerald-7': totals.net > 0,
              }"
            >
              {{ totals.net > 0 ? '+' : '' }}{{ formattedCashflow }}
            </span>
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
          <div
            uppercase
            font="medium"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="allTime">Total earned</span>
            <span v-else>Earned this month</span>
          </div>
          <span font-mono>
            <FLoader v-if="totalsLoading" />
            <span v-else-if="totals">
              {{ formattedIncome }}
            </span>
          </span>
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
          <div
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="allTime">Total spent</span>
            <span v-else>spent this month</span>
          </div>
          <span font-mono>
            <FLoader v-if="totalsLoading" />
            <span v-else-if="totals">
              {{ formattedExpense }}
            </span></span>
        </div>
      </div>
    </div>
  </FCard>
</template>
