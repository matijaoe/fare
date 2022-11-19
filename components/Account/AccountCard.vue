<script setup lang="ts">
import type { AccountTotals, CashAccountWithAccount } from '~~/models/resources/account'
type Props = {
  cashAccount: CashAccountWithAccount
  totals?: AccountTotals
  totalsLoading?: boolean
  allTime?: boolean
}

const props = defineProps<Props>()
const cashAccountModal = useCashAccountModal()

const { bg1, color4 } = useAppColors(props.cashAccount.account.color)

const account = $computed(() => props.cashAccount.account)
const totals = $computed(() => props.totals)

// TODO: skeleton instead of xxx
const formattedBalance = totals?.balance != null ? useCurrencyFormat(totals.balance) : '€XXX.XX'
const formattedNet = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'always' }) : '€XXX.XX'
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income, { signDisplay: 'always' }) : '€XXX.XX'
const formattedExpense = totals?.expense != null ? useCurrencyFormat(-totals.expense) : '€XXX.XX'

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

const { isDark } = useTheme()
</script>

<template>
  <FCard
    ref="card"
    :white="!isDark"
    :filled="isDark"
    paddingless
    aspect="2/1 sm:4/3"
    flex="~ col"
    relative overflow-hidden
  >
    <div p-4 flex="1 ~ col">
      <div flex justify-between items-center w-full>
        <div flex items-center gap-4>
          <div
            w-10 h-10 flex-center
            absolute top--4 left--4
            rounded-full
            :class="[bg1]"
            class="transform origin-center scale-1000 filter-saturate-80 opacity-80 sm:scale-600 dark:opacity-25"
          />
          <div flex items-center justify-start min-w-5>
            <Icon
              :name="account.icon ?? 'tabler:cash'"
              :class="[color4]"
              z-2
            />
          </div>
          <p z-2 font="display medium" uppercase text-base>
            {{ account.name }}
          </p>
        </div>

        <div>
          <FTooltip content="Edit" placement="top">
            <button @click.stop="cashAccountModal.launch(account)">
              <Icon v-show="isHovered" text="zinc-6 dark:zinc-5" name="tabler:edit" />
            </button>
          </FTooltip>
        </div>
      </div>

      <div
        flex="1 ~ col gap-1" justify-center
        mb--2 z-2 relative text-center
      >
        <FTooltip mx-auto placement="right" content="Balance">
          <div
            font="display medium"
            text-4xl uppercase
            flex justify-center
          >
            <FSkeleton
              v-if="totalsLoading"
              w-24 h="36px"
              py-2 py="0.5"
            />
            <span v-else-if="totals">
              {{ formattedBalance }}
            </span>
          </div>
        </FTooltip>
        <FTooltip mx-auto placement="right" content="Net">
          <p
            flex flex-col
            font="mono medium"
            text="sm zinc-4 dark:zinc-5"
          >
            <FSkeleton v-if="totalsLoading" h="28px" w-14 />
            <span
              v-else-if="totals"
              class="filter-saturate-90"
              px-2 py-1 rounded-md
              :class="{
                ' bg-stone-1 text-stone-7': totals.net === 0,
                'bg-red-1 text-red-7': totals.net < 0,
                'bg-emerald-1 text-emerald-7': totals.net > 0,
              }"
            >
              {{ totals.net > 0 ? '+' : '' }}{{ formattedNet }}
            </span>
          </p>
        </FTooltip>
      </div>
    </div>

    <div
      mt-auto z-2 relative
      grid="~ cols-2"
      border="base dark:zinc-7 t-dashed t-2"
      text="center lg"
    >
      <div
        z-2 py-4 w-full
        border="base dark:zinc-7 r-dashed r-1"
        flex="~ col"
      >
        <div
          flex="~ col"
          translate-y="0.4"
        >
          <div uppercase font="medium" text="10px zinc-4 dark:zinc-5" leading-tight>
            <span v-if="allTime">Total earned</span>
            <span v-else>Earned</span>
          </div>
          <div font-mono flex justify-center>
            <FSkeleton v-if="totalsLoading" h="28px" w-18 />
            <span v-else-if="totals">
              {{ totals.income > 0 ? '+' : '' }}{{ formattedIncome }}
            </span>
          </div>
        </div>
      </div>
      <div
        z-2 py-4 w-full
        border="base dark:zinc-7 l-dashed l-1"
      >
        <div
          flex="~ col"
          translate-y="0.4"
        >
          <div
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            leading-tight uppercase
          >
            <span v-if="allTime">Total spent</span>
            <span v-else>Spent</span>
          </div>
          <div font-mono flex justify-center>
            <FSkeleton v-if="totalsLoading" h="28px" w-18 />
            <span v-else-if="totals">
              {{ formattedExpense }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </FCard>
</template>
