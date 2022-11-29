<script setup lang="ts">
import type { InvestmentEntry } from '@prisma/client'
import { isNumber } from '@vueuse/core'
import { getMonth, isSameYear, isThisYear } from 'date-fns'
import type Input from '~~/components/F/Input.vue'
import type { InvestmentAccountWithAccount } from '~~/models/resources'
import { formatPercentage } from '~~/utils'

type Props = {
  investmentAccount: InvestmentAccountWithAccount
  balanceLoading?: boolean
  // TODO: all time is wrong, leaves things as is
  allTime?: boolean
  balances: Record<string, InvestmentEntry>
}

const props = defineProps<Props>()

const modal = useInvestmentAccountModal()

const account = $computed(() => props.investmentAccount.account)

const { selectedMonth } = toRefs(useDateRangeStore())

// --------------- Balances ---------------

const sortedBalances = computed(() => {
  const balances = Object.values(props.balances ?? {})
  // sort by newest
  return balances.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

// TODO: last updated date not correct, was working before
const currentBalanceEntry = computed(() => props.balances?.[getYearMonthKey(selectedMonth.value)])
const currentBalance = computed(() => currentBalanceEntry.value?.balance)

const previousBalanceEntry = computed(() => {
  const [previous] = sortedBalances.value
    .filter(({ date }) => getMonth(new Date(date)) < getMonth(new Date(selectedMonth.value)) && isSameYear(new Date(date), selectedMonth.value))
  return previous ?? null
})
const previousBalance = computed(() => previousBalanceEntry.value?.balance)

const percentageChange = computed(() => {
  if (!isNumber(currentBalance.value) || !isNumber(previousBalance.value)) {
    return null
  }
  const percentage = (currentBalance.value - previousBalance.value) / previousBalance.value
  if (isNaN(percentage)) {
    return 0
  }
  return percentage
})

const formattedBalance = useCurrencyFormat(currentBalance as unknown as number)
const formattedPreviousBalance = useCurrencyFormat(previousBalance as unknown as number)

// --------------- Card hover ---------------

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

// --------------- Edit balance ---------------

const { mutate: createEntry, isLoading: isUpdateEntryLoading } = useInvestmentAccountsEntryCreate()

let isEditMode = $ref(false)
let balanceValue = $ref<number | null>(null)

const editBalanceHandler = () => {
  if (isNumber(balanceValue) && balanceValue !== currentBalance.value) {
    createEntry({
      balance: balanceValue ?? 0,
      investmentAccountId: props.investmentAccount.id,
      date: selectedMonth.value,
    }, {
      onSuccess: () => {
        isEditMode = false
      },
    })
  } else {
    isEditMode = false
  }
}

const editBalanceInputEl = ref<InstanceType<typeof Input> | null>()
const setEditMode = (value: boolean) => {
  isEditMode = value
  if (value) {
    balanceValue = currentBalanceEntry.value?.balance ?? previousBalanceEntry.value?.balance ?? null
    setTimeout(() => {
      editBalanceInputEl.value?.inputEl?.select()
    }, 0)
  }
}
</script>

<template>
  <FCard
    ref="card"
    white
    aspect="2/1 sm:4/3"
    paddingless
    neobrutal
    flex="~ col"
    relative overflow-hidden
  >
    <div p-4 flex="1 ~ col">
      <AccountCardHead
        :account="account"
        :show-edit="isHovered"
        @edit="modal.launch(investmentAccount)"
      />

      <div
        flex="1 ~ col gap-1" justify-center
        z-2 relative text-center
      >
        <div v-show="isEditMode" flex justify-center>
          <form @submit.prevent="editBalanceHandler">
            <FInput
              ref="editBalanceInputEl"
              v-model="balanceValue"
              type="number"
              icon="tabler:cash"
              :input-props="{ step: 0.01 }"
              :loading="isUpdateEntryLoading"
              input-class="!max-w-150px !bg-transparent"
              @blur="editBalanceHandler"
            />
          </form>
        </div>

        <FTooltip v-show="!isEditMode" mx-auto placement="right" content="Balance">
          <div
            font="display medium" text-4xl uppercase flex justify-center
            @click="setEditMode(true)"
          >
            <FSkeleton
              v-if="balanceLoading"
              variant="lighter"
              w-24 h="36px" py-2 py="0.5"
            />
            <div v-else-if="currentBalanceEntry">
              <p>{{ formattedBalance }}</p>
            </div>
            <div v-else-if="previousBalanceEntry" flex flex-col items-center>
              <p>{{ formattedPreviousBalance }}</p>
            </div>

            <p v-else text-lg text-zinc-3>
              Click to set
            </p>
          </div>
        </FTooltip>

        <div
          v-if="currentBalanceEntry || previousBalanceEntry"
          text-xs text-zinc-4 font-mono font-light
        >
          <p v-if="currentBalanceEntry">
            last updated in {{ formatDate(currentBalanceEntry.date, {
              year: isThisYear(new Date(currentBalanceEntry.date)) ? undefined : 'numeric',
              month: 'short',
              dateStyle: undefined,
            }) }}
          </p>
          <p v-else-if="previousBalanceEntry" relative>
            last updated in {{ formatDate(previousBalanceEntry.date, {
              year: isThisYear(new Date(previousBalanceEntry.date)) ? undefined : 'numeric',
              month: 'short',
              dateStyle: undefined,
            }) }}
            <FBadge color="red" type="solid" class="absolute bottom--8 left-50% -translate-x-50%">
              outdated
            </FBadge>
          </p>
        </div>
      </div>
    </div>

    <!-- <div
      v-if="investmentAccount.description"
      mt-auto z-2 relative
      flex items-center justify-center
      text="lg"
      p-4
      text-zinc-4
    >
      <p text-sm>
        {{ investmentAccount.description }}
      </p>
    </div> -->

    <div
      mt-auto z-2 relative
      flex items-center justify-between gap-4
      border="base dark:zinc-7 t-dashed t-2"
      text="center lg"
      p-4 text-xs
    >
      <p v-if="percentageChange != null">
        <span
          font-bold
          :class="{
            'text-emerald-5': percentageChange > 0,
            'text-rose-5': percentageChange < 0,
          }"
        >{{ formatPercentage(percentageChange) }}</span> since last month
      </p>
      <p ml-auto>
        predicted <span font-bold>{{ investmentAccount.expectedRateOfReturn }}%</span> YoY
      </p>
    </div>
  </FCard>
</template>
