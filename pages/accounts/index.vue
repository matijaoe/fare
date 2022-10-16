<script lang="ts" setup>
import { get } from '@vueuse/core'

const route = useRoute()

setBreadcrumbs([
  { label: 'Accounts', href: { name: route.name } },
])

const cashAccountStore = useCashAccountModal()
const { rangeFrom, rangeTo, isAllTime } = toRefs(useDateRangeStore())

const { data: totalBalance, isLoading: isBalanceLoading } = useCashAccountsBalance()

const { data: cashAccounts } = useCashAccounts()
const { data: accountTotals, isLoading: isTotalsLoading } = useCashAccountsTotals(rangeFrom, rangeTo)

const balance = computed(() => totalBalance.value?.balance ?? 0)
const formattedTotalBalance = useCurrencyFormat(balance)

const shownAccounts = computed(() => {
  const findAccount = (id: string) => accountTotals.value?.find(acc => acc.id === id)

  return cashAccounts.value?.map((account) => {
    const { timestamp = Date.now(), totals } = findAccount(account.id) ?? {}
    return {
      ...account,
      timestamp,
      totals,
    }
  })
})

await useFetch('/api/accounts/cash?transactions=false', {
  key: 'cash-accounts',
})

await useFetch(`/api/accounts/totals?from=${get(rangeFrom)}&to=${get(rangeTo)}`, {
  key: `cash-accounts-totals-${get(rangeFrom)}-${get(rangeTo)}`,
})

watch([rangeFrom, rangeTo], async () => {
  await useFetch(`/api/accounts/totals?from=${rangeFrom.value}&to=${rangeTo.value}`, {
    key: `cash-accounts-totals-${rangeFrom.value}-${rangeTo.value}`,
  })
}, { immediate: true })
</script>

<template>
  <div flex flex-col gap-4>
    <DateSwitchHeader />
    <div
      my-4
      flex="~ col gap-2"
      translate-y="0.4"
    >
      <span
        uppercase
        font="sans medium"
        text="sm zinc-4 dark:zinc-5"
        class="leading-tight"
      >
        Total balance
      </span>

      <div
        text-6xl
        font="display medium"
      >
        <div
          v-if="isBalanceLoading"
          flex
          gap-4
          items-center
          class="color-base-lighter"
        >
          <span>€X,XXX.XX</span>
          <FLoader text-4xl />
        </div>
        <h4 v-else>
          {{ formattedTotalBalance }}
        </h4>
      </div>
    </div>

    <LayoutSectionWrapper title="Cash accounts" subtitle="Actively tracked accounts" mt-3>
      <template #right>
        <FButton
          variant="secondary"
          icon="tabler:plus"
          icon-placement="left"
          @click="cashAccountStore.launch()"
        >
          Add account
        </FButton>
      </template>
      <div
        v-if="shownAccounts?.length"
        class="custom-grid"
        gap-3
      >
        <AccountCard
          v-for="account in shownAccounts"
          :key="`${account.id}-${account.timestamp}`"
          :cash-account="account"
          :totals="account.totals"
          :totals-loading="isTotalsLoading"
          :all-time="isAllTime"
          @click="navigateTo({
            name: 'accounts-accountId',
            params: { accountId: account.id },
          })"
        />
      </div>
    </LayoutSectionWrapper>
  </div>
</template>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
