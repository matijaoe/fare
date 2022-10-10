<script setup lang="ts">
import { get } from '@vueuse/core'
import SectionWrapper from '~~/components/layout/SectionWrapper.vue'

const route = useRoute()
const { data: account, isLoading } = useCashAccount(route.params.accountId as string)

// TODO: add to types
const transactions = computed(() => isDefined(account)
  ? [...get(account)?.paymentFromAccount, ...get(account)?.paymentToAccount].map(tr => ({
      ...tr,
    }))
  : [])
</script>

<template>
  <SectionWrapper :title="account?.account.name">
    <div v-if="account">
      <TransactionList v-if="transactions?.length" :transactions="transactions" :loading="isLoading" />
    </div>
  </SectionWrapper>
</template>
