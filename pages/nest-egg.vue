<script lang="ts" setup>
import { InvestmentType } from '@prisma/client'
import AccountCardInvestment from '~~/components/Account/AccountCardInvestment.vue'

onMounted(() => setBreadcrumbs([
  { label: 'Nest egg', href: { name: useRoute().name ?? '🥺' } },
]))

const { isAllTime, monthQuery, isCurrentMonth } = toRefs(useDateRangeStore())

const { data: totalBalance, isLoading: isBalanceLoading } = useInvestmentsBalance()
const { data: monthlyBalanceObj, isLoading: isMonthlyBalanceLoading } = useInvestmentsMonthlyBalance(monthQuery)

const balance = computed(() => totalBalance.value?.balance ?? 0)

// TODO: balance isnt always correct, sometimes outdated arent shown but are applied, should be shown as well
const monthlyBalance = computed(() => monthlyBalanceObj.value?.balance ?? 0)

const formattedTotalBalance = useCurrencyFormat(balance)
const formattedMonthlyBalance = useCurrencyFormat(monthlyBalance)

const { data: investmentAccounts, isLoading: isAccountsLoading } = useInvestmentAccounts()
const { data: investmentEntries, isLoading: isEntriesLoading } = useInvestmentAccountsEntries()

const unifiedAccounts = computed(() => {
  const getBalances = (investmentAccountId: string) => {
    const acc = investmentEntries.value?.find(acc => acc.investmentAccountId === investmentAccountId)
    return acc?.balances ?? {}
  }

  return investmentAccounts.value?.map((account) => {
    const balances = getBalances(account.id)
    return { ...account, balances }
  }) ?? []
})

const modal = useInvestmentAccountModal()

const getAccountsForType = (type: InvestmentType) => unifiedAccounts.value?.filter(acc => acc.type === type) ?? []

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
    accounts: getAccountsForType(InvestmentType.Other),
  },
]))
</script>

<template>
  <LayoutPage>
    <div flex items-center gap-8 divide-x-2 divide-zinc-3>
      <div flex="~ col gap-2" translate-y="0.4">
        <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
          Nest egg
        </span>

        <div font="display medium" text-6xl>
          <div v-if="isBalanceLoading" flex gap-4 items-center>
            <FSkeleton class="h-60px w-60" />
          </div>
          <h4 v-else>
            {{ formattedTotalBalance }}
          </h4>
        </div>
      </div>

      <div v-if="!isCurrentMonth && !isAllTime" pl-8>
        <div flex="~ col gap-2" translate-y="0.4">
          <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
            At the time
          </span>

          <div font="display medium" text-6xl>
            <div
              v-if="isMonthlyBalanceLoading"
              flex gap-4 items-center
            >
              <FSkeleton class="h-60px w-40" />
            </div>
            <h4 v-else text-zinc-4>
              {{ formattedMonthlyBalance }}
            </h4>
          </div>
        </div>
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

