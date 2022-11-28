<script lang="ts" setup>
import { InvestmentType } from '@prisma/client'
import AccountCardInvestment from '~~/components/Account/AccountCardInvestment.vue'

onMounted(() => setBreadcrumbs([
  { label: 'Nest egg', href: { name: useRoute().name ?? '🥺' } },
]))

const { isAllTime, isCurrentMonth } = toRefs(useDateRangeStore())

const {
  formattedMonthlyBalance,
  formattedTotalBalance,
  isBalanceLoading,
  isMonthlyBalanceLoading,
  isAccountsLoading,
  isEntriesLoading,
  getAccountsForType,
  formattedAverageAnnualRate,
} = toRefs(useNestEggStore())

const modal = useInvestmentAccountModal()

const sections = computed(() => ([
  {
    type: InvestmentType.Stocks,
    title: 'Stocks, ETF\'s & bonds',
    desc: 'Actively tracked investment accounts',
  },
  {
    type: InvestmentType.Crypto,
    title: 'Crypto',
    desc: 'Actively tracked crypto accounts',
  },
  {
    type: InvestmentType.Property,
    title: 'Property',
    desc: 'All of your properties',
  },
  {
    type: InvestmentType.Other,
    title: 'Miscellaneous',
    desc: 'All of your miscellaneous investments',
  },
]))
</script>

<template>
  <LayoutPage>
    <div flex items-center gap-8>
      <div flex="~ col gap-2" translate-y="0.4">
        <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
          Nest egg
        </span>

        <div font="display medium" text-6xl>
          <div v-if="isBalanceLoading" flex gap-4 items-center>
            <FSkeleton class="h-60px w-60" />
          </div>
          <p v-else>
            {{ formattedTotalBalance }}
          </p>
        </div>
      </div>

      <div v-if="!isCurrentMonth && !isAllTime" pl-8 border="l-2 zinc-2">
        <div flex="~ col gap-2" translate-y="0.4">
          <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
            At the time
          </span>

          <div font="display medium" text-6xl text-zinc-4>
            <div
              v-if="isMonthlyBalanceLoading"
              flex gap-4 items-center
            >
              <FSkeleton class="h-60px w-40" />
            </div>
            <p v-else>
              {{ formattedMonthlyBalance }}
            </p>
          </div>
        </div>
      </div>

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
            :all-time="isAllTime"
          />
        </AccountGridSection>
      </LayoutSectionWrapper>
    </div>
  </LayoutPage>
</template>

