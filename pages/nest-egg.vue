<script lang="ts" setup>
import { get } from '@vueuse/core'

const route = useRoute()

onMounted(() => setBreadcrumbs([
  { label: 'Nest egg', href: { name: route.name ?? '🥺' } },
]))

// TODO: transaction account modal
// const cashAccountModal = useCashAccountModal()
const { selectedMonth, isAllTime } = toRefs(useDateRangeStore())

// TODO: nest egg balance
const { data: totalBalance, isLoading: isBalanceLoading } = useInvestmentsBalance()
const balance = computed(() => totalBalance.value?.balance ?? 0)
const formattedTotalBalance = useCurrencyFormat(balance)

const { data: investmentAccounts } = useInvestmentAccounts()
const { data: investmentEntries, isLoading: isEntriesLoading } = useInvestmentAccountsEntries()

const unifiedAccounts = computed(() => {
  const key = getYearMonthKey(isDefined(selectedMonth) ? new Date(selectedMonth.value) : new Date())

  const getBalances = (investmentAccountId: string) => {
    const acc = investmentEntries.value?.find(acc => acc.investmentAccountId === investmentAccountId)
    // TODO: if no balance, get latest old balance, but alert user about it
    // return acc?.balances?.[key]?.balance ?? 0
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

const modal = useInvestmentAccountModal()
</script>

<template>
  <LayoutPage>
    <div flex="~ col gap-2" translate-y="0.4">
      <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
        Nest egg
      </span>

      <div text-6xl font="display medium">
        <div
          v-if="isBalanceLoading"
          flex gap-4 items-center
          class="color-base-lighter"
        >
          <FSkeleton class="h-60px w-60" />
        </div>
        <h4 v-else>
          {{ formattedTotalBalance }}
        </h4>
      </div>
    </div>

    <div space-y-20>
      <LayoutSectionWrapper title="Stocks, ETF's & bonds" desc="Actively tracked investment accounts" mt-3>
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
            @click="modal.launch()"
          >
            <!-- @click="cashAccountModal.launch()" -->
            Add account
          </FButton>
        </template>

        <div
          v-if="accountsStocks?.length"
          class="custom-grid" gap-3
        >
          <!-- TODO: keep an eye on this key...  -->
          <InvestmentCard
            v-for="account in accountsStocks"
            :key="account"
            :investment-account="account"
            :balances="account.balances"
            :balance-loading="isEntriesLoading"
            :all-time="isAllTime"
          />
        </div>
      </LayoutSectionWrapper>

      <LayoutSectionWrapper title="Crypto" desc="Actively tracked crypto accounts" mt-3>
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
          >
            <!-- @click="cashAccountModal.launch()" -->
            Add account
          </FButton>
        </template>

        <div
          v-if="accountsCrypto?.length"
          class="custom-grid" gap-3
        >
          <!-- TODO: keep an eye on this key...  -->
          <InvestmentCard
            v-for="account in accountsCrypto"
            :key="account"
            :investment-account="account"
            :balances="account.balances"
            :balance-loading="isEntriesLoading"
            :all-time="isAllTime"
          />
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
