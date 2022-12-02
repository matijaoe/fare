<script lang="ts" setup>
import type { CashAccountWithBalance, CashAccountWithTotals } from '~~/models/resources'

onMounted(() => setBreadcrumbs([
  { label: 'Accounts', href: { name: useRoute().name ?? '🥺' } },
]))

const cashAccountModal = useCashAccountModal()

const { monthQuery, isAllTime } = toRefs(useDateRangeStore())
const {
  formattedTotalBalance,
  formattedMonthlyBalance,
  isBalanceLoading,
  isMonthlyBalanceLoading,
} = useBalanceCash()

const { data: cashAccounts, isLoading: isAccountsLoading } = useCashAccounts()
const { data: accountsTotals, isLoading: isTotalsLoading } = useCashAccountsTotals(monthQuery)
const { data: accountsTotalsBalance, isLoading: isTotalsBalanceLoading } = useCashAccountsTotalsBalance()

const unifiedAccounts = computed(() => {
  const findAccountTotals = (id: string) => accountsTotals.value?.find(acc => acc.id === id)
  const findAccountTotalsBalance = (id: string) => accountsTotalsBalance.value?.find(acc => acc.id === id)

  return cashAccounts.value?.map((account) => {
    const { totals } = findAccountTotals(account.id) ?? {}
    const { balance } = findAccountTotalsBalance(account.id) ?? {}
    return { ...account, totals, balance } as CashAccountWithTotals & CashAccountWithBalance
  }) ?? []
})
</script>

<template>
  <LayoutPage>
    <BalanceShownWrapper>
      <template #current>
        <BalanceBasic
          label="Total balance"
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

    <LayoutSectionWrapper title="Cash accounts" desc="Actively tracked accounts" mt-3>
      <template #right>
        <FButton
          variant="secondary"
          icon-placement="left"
          @click="cashAccountModal.launch()"
        >
          Create account
        </FButton>
      </template>

      <AccountGridSection
        :loading="isAccountsLoading"
        :has-accounts="!!unifiedAccounts?.length"
      >
        <AccountCardCash
          v-for="account in unifiedAccounts"
          :key="account"
          :cash-account="account"
          :totals="account.totals"
          :totals-loading="isTotalsLoading"
          :balance="account.balance"
          :balance-loading="isTotalsBalanceLoading"
          :all-time="isAllTime"
        />
      </AccountGridSection>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
