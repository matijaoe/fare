<script setup lang="ts">
import type { Account, CashAccount, Ledger } from '@prisma/client'
import { formatCurrency, sum } from '~~/utils'

type Props = {
  account: Account & {
    CashAccount: CashAccount & {
      paymentFromAccount: Ledger[]
      paymentToAccount: Ledger[]
    }
  }
}

const props = defineProps<Props>()

const {
  colorSolidBg,
  colorSolidText,
  colorDotText,
  colorDotBg,
} = useAppColors(props.account.color)

const mapAmounts = (type: 'from' | 'to') => {
  const { paymentFromAccount, paymentToAccount } = props.account.CashAccount
  switch (type) {
    case 'from':
      return paymentFromAccount.map(p => p.amount)
    case 'to':
      return paymentToAccount.map(p => p.amount)
  }
}

const incomeTotal = $computed(() => sum(...mapAmounts('from')))
const expenseTotal = $computed(() => sum(...mapAmounts('to')))

const cashflow = computed(() => incomeTotal - expenseTotal)
</script>

<template>
  <FCard
    overflow-hidden
    white
    paddingless
    aspect="2/1 sm:3/2"
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
        mt-3
        flex="1 ~ col"
        justify-center
        relative
        z-2
        text-center
        font-mono
      >
        <div
          text="3xl"
        >
          €2478.23
        </div>
        <div text-sm mt-1 opacity-70>
          {{ formatCurrency(cashflow) }} this month
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
      >
        {{ formatCurrency(incomeTotal) }}
      </div>
      <div
        z-2
        py-4
        border="base dark:zinc-7 l-dashed l-1"
        w-full
        font="mono"
      >
        {{ formatCurrency(expenseTotal) }}
      </div>
    </div>
  </FCard>
</template>
