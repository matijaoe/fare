<script lang="ts" setup>
const route = useRoute()

onMounted(() => setBreadcrumbs([
  { label: 'Nest egg', href: { name: route.name ?? '🥺' } },
]))

const { isDark } = useTheme()
const { isAllTime, monthQuery, isCurrentMonth } = toRefs(useDateRangeStore())

const { data: totalBalance, isLoading: isBalanceLoading } = useInvestmentsBalance()
const { data: monthlyBalanceObj, isLoading: isMonthlyBalanceLoading } = useInvestmentsMonthlyBalance(monthQuery)

const balance = computed(() => totalBalance.value?.balance ?? 0)

// TODO: balance isnt always correct, sometimes outdated arent shown but are applied, should be shown as well
const monthlyBalance = computed(() => monthlyBalanceObj.value?.balance ?? 0)

const formattedTotalBalance = useCurrencyFormat(balance)
const formattedMonthlyBalance = useCurrencyFormat(monthlyBalance)

const { data: investmentAccounts } = useInvestmentAccounts()
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

// TODO: more types
const accountsStocks = computed(() => unifiedAccounts.value?.filter(({ type }) => type === 'Stocks'))
const accountsCrypto = computed(() => unifiedAccounts.value?.filter(({ type }) => type === 'Crypto'))
const accountsProperty = computed(() => unifiedAccounts.value?.find(({ type }) => type === 'Property'))

const modal = useInvestmentAccountModal()
</script>

<template>
  <LayoutPage>
    <div flex items-center gap-8 divide-x-2 divide-zinc-3>
      <div flex="~ col gap-2" translate-y="0.4">
        <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
          Total balance
        </span>

        <div font="display medium" text-6xl>
          <div
            v-if="isBalanceLoading"
            flex gap-4 items-center
          >
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
      <LayoutSectionWrapper title="Stocks, ETF's & bonds" desc="Actively tracked investment accounts" mt-3>
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
            @click="modal.launchWithType('Stocks')"
          >
            Add account
          </FButton>
        </template>

        <div class="custom-grid" gap-4>
          <template v-if="accountsStocks?.length">
            <InvestmentCard
              v-for="account in accountsStocks"
              :key="account"
              :investment-account="account"
              :balances="account.balances"
              :balance-loading="isEntriesLoading"
              :all-time="isAllTime"
            />
          </template>
          <AccountCardEmpty v-else>
            Nothing here yet
          </AccountCardEmpty>
        </div>
      </LayoutSectionWrapper>

      <LayoutSectionWrapper title="Crypto" desc="Actively tracked crypto accounts" mt-3>
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
            @click="modal.launchWithType('Crypto')"
          >
            Add account
          </FButton>
        </template>

        <div class="custom-grid" gap-4>
          <template v-if="accountsCrypto?.length">
            <InvestmentCard
              v-for="account in accountsCrypto"
              :key="account"
              :investment-account="account"
              :balances="account.balances"
              :balance-loading="isEntriesLoading"
              :all-time="isAllTime"
            />
          </template>
          <AccountCardEmpty v-else>
            Nothing here yet
          </AccountCardEmpty>
        </div>
      </LayoutSectionWrapper>

      <LayoutSectionWrapper title="Property" desc="All of your properties" mt-3>
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
            @click="modal.launchWithType('Property')"
          >
            Add account
          </FButton>
        </template>

        <div class="custom-grid" gap-4>
          <template v-if="accountsProperty?.length">
            <InvestmentCard
              v-for="account in accountsProperty"
              :key="account"
              :investment-account="account"
              :balances="account.balances"
              :balance-loading="isEntriesLoading"
              :all-time="isAllTime"
            />
          </template>
          <AccountCardEmpty v-else>
            Nothing here yet
          </AccountCardEmpty>
        </div>
      </LayoutSectionWrapper>
    </div>
  </LayoutPage>
</template>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
