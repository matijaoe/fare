<script setup lang="ts">
import type { AccountTotals, CashAccountWithAccount } from '~~/models/resources/account'

import type Input from '~~/components/F/Input.vue'
type Props = {
  investmentAccount: CashAccountWithAccount
  totals?: AccountTotals
  totalsLoading?: boolean
  allTime?: boolean
}

const props = defineProps<Props>()
const cashAccountModal = useCashAccountModal()

const { bg1, color4 } = useAppColors(props.investmentAccount.account.color)

const account = $computed(() => props.investmentAccount.account)
const totals = $computed(() => props.totals)

// TODO: skeleton instead of xxx
const formattedBalance = totals?.balance != null ? useCurrencyFormat(totals.balance) : '€XXX.XX'

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

const { isDark } = useTheme()

let isEditMode = $ref(false)

let editBalance = $ref<number | null>(null)
const editBalanceHandler = () => {
  console.log('editBalanceHandler', editBalance)
  isEditMode = false
}
const editBalanceInputEl = ref<InstanceType<typeof Input> | null>()
const setEditMode = (value: boolean) => {
  isEditMode = value
  if (value) {
    editBalance = totals?.balance ?? null
    // TODO: not focusing
    editBalanceInputEl.value?.inputEl?.focus()
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
        <div v-show="isEditMode" flex justify-center>
          <form @submit.prevent="editBalanceHandler">
            <FInput
              ref="editBalanceInputEl"
              v-model="editBalance"
              max-w="200px"
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
              v-if="totalsLoading"
              variant="lighter"
              w-24 h="36px" py-2 py="0.5"
            />
            <span v-else-if="totals">
              {{ formattedBalance }}
            </span>
          </div>
        </FTooltip>
      </div>
    </div>

    <div
      mt-auto z-2 relative
      flex items-center justify-center
      border="base dark:zinc-7 t-dashed t-2"
      text="center lg"
      p-4
    >
      <p text-sm>
        VWCE, BRK.B, S&P500
      </p>
    </div>
    <div
      mt-auto z-2 relative
      flex items-center justify-center
      border="base dark:zinc-7 t-dashed t-2"
      text="center lg"
      p-4
    >
      <p text-sm>
        predicted 8% YoY growth
      </p>
    </div>
  </FCard>
</template>
