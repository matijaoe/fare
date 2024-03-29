<script setup lang="ts">
import type { AccountTotals, CashAccountWithAccount } from '~~/models/resources'
type Props = {
  cashAccount: CashAccountWithAccount
  totals?: AccountTotals
  balance?: number
  balanceLoading?: boolean
  totalsLoading?: boolean
  allTime?: boolean
}

const props = defineProps<Props>()
const modal = useCashAccountModal()

const account = $computed(() => props.cashAccount.account)
const totals = $computed(() => props.totals)

const formattedBalance = props?.balance != null ? useCurrencyFormat(props.balance) : null
const formattedNet = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'exceptZero' }) : null
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income) : null
const formattedExpense = totals?.expense != null ? useCurrencyFormat(totals.expense) : null

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)
</script>

<template>
  <FCard
    ref="card"
    white
    paddingless
    neobrutal
    aspect="4/3"
    flex="~ col"
    relative overflow-hidden
  >
    <div p-4 flex="1 ~ col">
      <AccountCardHead
        :account="account"
        :to="`/accounts/cash/${cashAccount.id}`"
        :show-edit="isHovered"
        @edit="modal.launch(account)"
      />

      <div
        flex="1 ~ col gap-1" justify-center
        mb--2 z-2 relative text-center
      >
        <FTooltip mx-auto placement="right" content="Total balance">
          <div font="display medium" text-4xl uppercase flex justify-center>
            <FSkeleton
              v-if="balanceLoading"
              variant="lighter"
              w-24 h="36px" mb-1
            />
            <span v-else-if="balance">
              {{ formattedBalance }}
            </span>
            <span v-else>
              {{ formatCurrency(0) }}
            </span>
          </div>
        </FTooltip>
        <FTooltip mx-auto placement="right" :content="allTime ? 'All-time net' : 'Monthly net'">
          <p flex flex-col font="mono medium" text="sm zinc-4 dark:zinc-5">
            <FSkeleton
              v-if="totalsLoading"
              variant="lighter"
              h="28px" w="51px"
            />
            <span
              v-else-if="totals"
              class="filter-saturate-90"
              px-2 py-1 rounded-md
              :class="{
                'bg-zinc-1 dark:bg-zinc-3/10 text-zinc-7 dark:text-zinc-4': totals.net === 0,
                'bg-rose-1 dark:bg-rose-3/10 text-rose-7 dark:text-rose-4': totals.net < 0,
                'bg-emerald-1 dark:bg-emerald-3/10 text-emerald-7 dark:text-emerald-4': totals.net > 0,
              }"
            >
              {{ formattedNet }}
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
        <div flex="~ col" translate-y="0.4">
          <div uppercase font="medium" text="10px zinc-4 dark:zinc-5" leading-tight>
            <span v-if="allTime">Total earned</span>
            <span v-else>Earned</span>
          </div>
          <div font-mono flex justify-center>
            <FSkeleton
              v-if="totalsLoading"
              variant="lighter"
              h="18px" m="t-0.75 b-1.75" w-18
            />
            <span v-else-if="totals">
              {{ formattedIncome }}
            </span>
          </div>
        </div>
      </div>

      <div z-2 py-4 w-full border="base dark:zinc-7 l-dashed l-1">
        <div flex="~ col" translate-y="0.4">
          <div
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            leading-tight uppercase
          >
            <span v-if="allTime">Total spent</span>
            <span v-else>Spent</span>
          </div>
          <div font-mono flex justify-center>
            <FSkeleton
              v-if="totalsLoading"
              variant="lighter"
              h="18px" m="t-1 b-1.5" w-18
            />
            <span v-else-if="totals">
              {{ formattedExpense }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </FCard>
</template>
