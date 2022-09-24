<script setup lang="ts">
import type { CashAccountWithTotals } from '~~/models/resources/account'
import { formatCurrency } from '~~/utils'

type Props = {
  cashAccount: CashAccountWithTotals
}

const props = defineProps<Props>()

const {
  colorSolidBg,
  colorDotText,
} = useAppColors(props.cashAccount.account.color)

const account = $computed(() => props.cashAccount.account)
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
          {{ formatCurrency(cashAccount.totals.balance) }}
        </div>
        <div text-sm mt-1 opacity-70>
          {{ formatCurrency(cashAccount.totals.net, { signDisplay: 'always' }) }} this month
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
        {{ formatCurrency(cashAccount.totals.income, { signDisplay: 'always' }) }}
      </div>
      <div
        z-2
        py-4
        border="base dark:zinc-7 l-dashed l-1"
        w-full
        font="mono"
      >
        {{ formatCurrency(cashAccount.totals.expense, { signDisplay: 'always' }) }}
      </div>
    </div>
  </FCard>
</template>
