<script setup lang="ts">
import { get } from '@vueuse/core'
import SectionWrapper from '~~/components/layout/SectionWrapper.vue'

const route = useRoute()

const accountId = $computed(() => route.params.accountId as string)

const { data: account, isLoading } = useCashAccount(accountId)

whenever(account, () => setBreadcrumbs([
  { label: 'Accounts', href: { name: 'accounts' } },
  { label: account.value?.account?.name ?? accountId, href: route.path },
]), { immediate: true })

// TODO: add to types
const transactions = computed(() => isDefined(account)
  ? [...get(account)?.paymentFromAccount, ...get(account)?.paymentToAccount].map(tr => ({
      ...tr,
    }))
  : [])
</script>

<template>
  <LayoutPage>
    <SectionWrapper :title="account?.account?.name ?? 'Unknown'">
      <template v-if="account">
        <TransactionList v-if="transactions?.length" :transactions="transactions" :loading="isLoading" />
      </template>
    </SectionWrapper>
  </LayoutPage>
</template>
