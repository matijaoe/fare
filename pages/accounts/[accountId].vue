<script setup lang="ts">
import { get } from '@vueuse/core'
import SectionWrapper from '~~/components/layout/SectionWrapper.vue'
import type { CashAccountWithAccount } from '~~/models/resources/account'

const route = useRoute()

const accountId = $computed(() => route.params.accountId as string)

const { data: account, isLoading } = useCashAccount(accountId)

watch(account, () => setBreadcrumbs([
  { label: 'Accounts', href: { name: 'accounts' } },
  { label: account.value?.account.name || accountId, href: route.path },
]), { immediate: true })

// TODO: add to types
const transactions = computed(() => isDefined(account)
  ? [...get(account)?.paymentFromAccount, ...get(account)?.paymentToAccount].map(tr => ({
      ...tr,
    }))
  : [])

await useFetch<CashAccountWithAccount>(`/api/accounts/cash/${accountId}`, { key: `cash-account-${accountId}` })
</script>

<template>
  <SectionWrapper :title="account?.account.name">
    <div v-if="account">
      <TransactionList v-if="transactions?.length" :transactions="transactions" :loading="isLoading" />
    </div>
  </SectionWrapper>
</template>
