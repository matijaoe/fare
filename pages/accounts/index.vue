<script lang="ts" setup>
const route = useRoute()

onMounted(() => setBreadcrumbs([
  { label: 'Accounts', href: { name: route.name ?? '🥺' } },
]))

const cashAccountModal = useCashAccountModal()

const { monthQuery, isAllTime } = toRefs(useDateRangeStore())

const { data: totalBalance, isLoading: isBalanceLoading } = useCashAccountsBalance()
const balance = computed(() => totalBalance.value?.balance ?? 0)
const formattedTotalBalance = useCurrencyFormat(balance)

const { data: cashAccounts, isLoading: isAccountsLoading } = useCashAccounts()
const { data: accountTotals, isLoading: isTotalsLoading } = useCashAccountsTotals(monthQuery)

const unifiedAccounts = computed(() => {
  const findAccount = (id: string) => accountTotals.value?.find(acc => acc.id === id)

  return cashAccounts.value?.map((account) => {
    const { totals } = findAccount(account.id) ?? {}
    return { ...account, totals }
  }) ?? []
})
</script>

<template>
  <LayoutPage>
    <div flex="~ col gap-2" translate-y="0.4">
      <span uppercase font="sans medium" text="sm zinc-4 dark:zinc-5" class="leading-tight">
        Total balance
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
        :has-accounts="unifiedAccounts?.length"
      >
        <AccountCard
          v-for="account in unifiedAccounts"
          :key="account"
          :cash-account="account"
          :totals="account.totals"
          :totals-loading="isTotalsLoading"
          :all-time="isAllTime"
        />
      </AccountGridSection>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
