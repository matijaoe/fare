<script setup lang="ts">
import { get } from '@vueuse/core'

const route = useRoute()

const accountId = $computed(() => route.params.accountId as string)

const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

const { data: account } = useCashAccount(accountId)
const { data: accountWithTransactions, isLoading } = useCashAccountWithTransactions(accountId, rangeFrom, rangeTo)

const fullAccountTransactions = computed(() => {
  if (isDefined(accountWithTransactions)) {
    const { paymentFromAccount, paymentToAccount } = get(accountWithTransactions)
    return [...paymentFromAccount, ...paymentToAccount]
  }
  return []
})

const { transactions, searchQuery } = useTransactionFilters(fullAccountTransactions)

whenever(account, () => setBreadcrumbs([
  { label: 'Accounts', href: { name: 'accounts' } },
  { label: account.value?.account?.name ?? accountId, href: route.path },
]), { immediate: true })
</script>

<template>
  <LayoutPageWithList>
    <template #list>
      <FInput
        v-model="searchQuery"
        type="search"
        placeholder="Search"
        icon="tabler:search"
        clearable
        input-class="rounded-none !bg-white !py-5"
        border="b-2 zinc-2 dark:zinc-9"
      />
      <TransactionList
        :transactions="transactions"
        :loading="isLoading"
      />
    </template>

    <template #content>
      <h2 text-2xl font-bold>
        {{ account?.account.name }}
      </h2>
    </template>
  </LayoutPageWithList>
</template>
