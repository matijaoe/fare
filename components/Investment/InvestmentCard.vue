<script setup lang="ts">
import type { InvestmentEntry } from '@prisma/client'
import { isNumber } from '@vueuse/core'
import { getMonth } from 'date-fns'
import type Input from '~~/components/F/Input.vue'
import type { InvestmentAccountWithAccount } from '~~/models/resources/investment-account'
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

const { isDark } = useTheme()
const { bg1, color4 } = useAppColors(props.investmentAccount.account.color)

const account = $computed(() => props.investmentAccount.account)

const { selectedMonth } = toRefs(useDateRangeStore())

// --------------- Balances ---------------

const sortedBalances = computed(() => {
  const balances = Object.values(props.balances ?? {})
  // sort by newest
  return balances.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const currentBalanceEntry = computed(() => props.balances?.[getYearMonthKey(selectedMonth.value)])
const currentBalance = computed(() => currentBalanceEntry.value?.balance)

const previousBalanceEntry = computed(() => {
  const [previous] = sortedBalances.value
    .filter(({ date }) => getMonth(new Date(date)) < getMonth(selectedMonth.value))
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

const formattedBalance = currentBalanceEntry.value ? useCurrencyFormat(currentBalance as unknown as number) : null
const formattedPreviousBalance = previousBalanceEntry.value ? useCurrencyFormat(previousBalance as unknown as number) : null

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
            w-10 h-10 flex-center absolute top--4 left--4 rounded-full
            class="transform origin-center scale-1000 filter-saturate-80 opacity-80 sm:scale-600 dark:opacity-25"
            :class="[bg1]"
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
            <button @click.stop="modal.launch(investmentAccount)">
              <Icon v-show="isHovered" text="zinc-6 dark:zinc-5" name="tabler:edit" />
            </button>
          </FTooltip>
        </div>
      </div>

      <div
        flex="1 ~ col gap-1" justify-center
        z-2 relative text-center
      >
        <div v-show="isEditMode" flex justify-center>
          <form @submit.prevent="editBalanceHandler">
            <!-- TODO: icon is not showing, worked -->
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
          text-xs text-stone-4 font-mono font-light
        >
          <p v-if="currentBalanceEntry">
            last updated on {{ useDateFormat(currentBalanceEntry.date) }}
          </p>
          <p v-else-if="previousBalanceEntry" relative>
            last updated on {{ useDateFormat(previousBalanceEntry.date) }}
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
            'text-green-6': percentageChange > 0,
            'text-red-6': percentageChange < 0,
          }"
        >{{ formatPercentage(percentageChange, {
          signDisplay: 'always',
        }) }}</span> since last month
      </p>
      <p ml-auto>
        predicted <span font-bold>{{ investmentAccount.expectedRateOfReturn }}%</span> YoY
      </p>
    </div>
  </FCard>
</template>
