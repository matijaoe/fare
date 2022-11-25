<script setup lang="ts">
import type { InvestmentEntry } from '@prisma/client'
import { isNumber } from '@vueuse/core'
import { getMonth } from 'date-fns'
import type Input from '~~/components/F/Input.vue'
import type { InvestmentAccountWithAccount } from '~~/models/resources/investment-account'
import { formatDate } from '~~/utils'

type Props = {
  investmentAccount: InvestmentAccountWithAccount
  balanceLoading?: boolean
  allTime?: boolean
  balances: Record<string, InvestmentEntry>
}

const props = defineProps<Props>()

const modal = useInvestmentAccountModal()

const { bg1, color4 } = useAppColors(props.investmentAccount.account.color)
const account = $computed(() => props.investmentAccount.account)

const { selectedMonth } = toRefs(useDateRangeStore())

// TODO: if no balance, get latest old balance, but alert user about it
const sortedBalances = computed(() => {
  const balances = Object.values(props.balances ?? {})
  return balances.sort((a, b) => new Date(b.date).getMilliseconds() - new Date(a.date).getMilliseconds())
})

const currentMonthBalanceEntry = computed(() => props.balances?.[getYearMonthKey(selectedMonth.value)])
const currentMonthBalance = computed(() => currentMonthBalanceEntry.value?.balance)

const previousBalanceEntry = computed(() => {
  const entriesBeforeSetDate = sortedBalances.value.filter(({ date }) => getMonth(new Date(date)) < getMonth(selectedMonth.value))
  const [previous] = entriesBeforeSetDate
  return previous ?? null
})

const percentageChange = computed(() => {
  if (!isNumber(currentMonthBalance.value) || !isNumber(previousBalanceEntry.value?.balance)) {
    return null
  }
  return (currentMonthBalance.value - previousBalanceEntry.value.balance) / previousBalanceEntry.value.balance
})

const formattedBalance = currentMonthBalanceEntry.value ? useCurrencyFormat(currentMonthBalance as unknown as number) : null

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

const { isDark } = useTheme()

let isEditMode = $ref(false)

const { mutate: createEntry, isLoading: isUpdateEntryLoading } = useInvestmentAccountsEntryCreate()

let balanceValue = $ref<number | null>(null)

const editBalanceHandler = () => {
  if (balanceValue != null) {
    const value = isNumber(balanceValue) ? balanceValue : parseFloat(balanceValue)
    createEntry({
      balance: typeof balanceValue === 'number' ? balanceValue : 0,
      investmentAccountId: props.investmentAccount.id,
      date: selectedMonth.value,
    }, {
      onSuccess: () => {
        isEditMode = false
      },
    })
  }
}

const editBalanceInputEl = ref<InstanceType<typeof Input> | null>()
const setEditMode = (value: boolean) => {
  isEditMode = value
  if (value) {
    balanceValue = currentMonthBalanceEntry.value?.balance ?? previousBalanceEntry.value?.balance ?? null
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
        mb--2 z-2 relative text-center
      >
        <div v-show="isEditMode" flex justify-center>
          <form @submit.prevent="editBalanceHandler">
            <FInput
              ref="editBalanceInputEl"
              v-model="balanceValue"
              icon="tabler:currency-euro"
              type="number"
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
            <div v-else-if="currentMonthBalance && formattedBalance">
              <p>{{ formattedBalance }}</p>
              <p text-xs text-stone-4 font-mono font-light>
                last updated {{ useDateFormat(currentMonthBalanceEntry.date) }}
              </p>
            </div>
            <div v-else-if="previousBalanceEntry" flex flex-col items-center>
              <p>{{ previousBalanceEntry.balance }}</p>
              <p text-xs text-stone-4 font-mono font-light>
                last updated {{ useDateFormat(previousBalanceEntry.date) }}
              </p>
              <FBadge color="red" type="solid" mt-2>
                outdated
              </FBadge>
            </div>

            <p v-else text-sm text-zinc-3>
              Not set
            </p>
          </div>
        </FTooltip>
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
      flex items-center justify-center
      border="base dark:zinc-7 t-dashed t-2"
      text="center lg"
      p-4
    >
      <p text-sm>
        predicted {{ investmentAccount.expectedRateOfReturn }}% YoY growth
      </p>
    </div>
  </FCard>
</template>
