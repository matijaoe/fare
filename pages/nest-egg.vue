<script lang="ts" setup>
import type { InvestmentType } from '~~/models/enums'
import AccountCardInvestment from '~~/components/Account/AccountCardInvestment.vue'

useHead({
  title: 'Nest Egg',
})

const {
  formattedMonthlyBalance,
  formattedTotalBalance,
  isBalanceLoading,
  isMonthlyBalanceLoading,
  isAccountsLoading,
  isEntriesLoading,
  getAccountsForType,
  formattedAverageAnnualRate,
} = useNestEgg()

const modal = useInvestmentAccountModal()

const sections = computed<{ type: InvestmentType; title: string; desc: string }[]>(() => ([
  {
    type: 'Stocks',
    title: 'Stocks, ETF\'s & bonds',
    desc: 'Actively tracked investment accounts',
  },
  {
    type: 'Crypto',
    title: 'Crypto',
    desc: 'Actively tracked crypto accounts',
  },
  {
    type: 'Property',
    title: 'Property',
    desc: 'All of your properties',
  },
  {
    type: 'Other',
    title: 'Miscellaneous',
    desc: 'All of your miscellaneous investments',
  },
]))
</script>

<template>
  <LayoutPage>
    <div flex items-center gap-8>
      <BalanceShownWrapper>
        <template #current>
          <BalanceBasic
            label="Nest egg"
            :loading="isBalanceLoading"
            :balance="formattedTotalBalance"
          />
        </template>

        <template #old>
          <BalanceBasic
            label="At the time"
            :loading="isMonthlyBalanceLoading"
            :balance="formattedMonthlyBalance"
            dimmed
          />
        </template>
      </BalanceShownWrapper>

      <div
        v-if="formattedAverageAnnualRate"
        ml-auto
        flex="~ col gap-2" translate-y="0.4"
        text-right
      >
        <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
          Avg annual rate
        </span>

        <p font="display medium" text-3xl>
          {{ formattedAverageAnnualRate }}
        </p>
      </div>
    </div>

    <div space-y-20>
      <LayoutSectionWrapper
        v-for="section in sections"
        :key="section.type"
        :title="section.title"
        :desc="section.desc"
        mt-3
      >
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
            @click="modal.launchWithType(section.type)"
          >
            Add account
          </FButton>
        </template>

        <AccountGridSection
          :loading="isAccountsLoading"
          :has-accounts="!!getAccountsForType(section.type)?.length"
        >
          <AccountCardInvestment
            v-for="account in getAccountsForType(section.type)"
            :key="account"
            :investment-account="account"
            :balances="account.balances"
            :balance-loading="isEntriesLoading"
          />
        </AccountGridSection>
      </LayoutSectionWrapper>
    </div>
  </LayoutPage>
</template>
