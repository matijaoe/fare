<script lang="ts" setup>
import { get } from '@vueuse/core'

const route = useRoute()

onMounted(() => setBreadcrumbs([
  { label: 'Accounts', href: { name: route.name ?? '🥺' } },
]))

const cashAccountModal = useCashAccountModal()
const { rangeFrom, rangeTo, isAllTime } = toRefs(useDateRangeStore())

const { data: totalBalance, isLoading: isBalanceLoading } = useCashAccountsBalance()
const balance = computed(() => totalBalance.value?.balance ?? 0)
const formattedTotalBalance = useCurrencyFormat(balance)

const { data: cashAccounts } = useCashAccounts()
const { data: accountTotals, isLoading: isTotalsLoading } = useCashAccountsTotals(rangeFrom, rangeTo)

const shownAccounts = computed(() => {
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
            @click="cashAccountModal.launch()"
          >
            Add account
          </FButton>
        </template>

        <div
          v-if="shownAccounts?.length"
          class="custom-grid" gap-3
        >
          <!-- TODO: keep an eye on this key...  -->
          <InvestmentCard
            v-for="account in shownAccounts"
            :key="account"
            :investment-account="account"
            :totals="account.totals"
            :totals-loading="isTotalsLoading"
            :all-time="isAllTime"
          />
        </div>
      </LayoutSectionWrapper>

      <LayoutSectionWrapper title="Crypto" desc="Actively tracked crypto accounts" mt-3>
        <template #right>
          <FButton
            variant="secondary"
            icon-placement="left"
            @click="cashAccountModal.launch()"
          >
            Add account
          </FButton>
        </template>

        <div
          v-if="shownAccounts?.length"
          class="custom-grid" gap-3
        >
          <!-- TODO: keep an eye on this key...  -->
          <InvestmentCard
            v-for="account in shownAccounts"
            :key="account"
            :investment-account="account"
            :totals="account.totals"
            :totals-loading="isTotalsLoading"
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