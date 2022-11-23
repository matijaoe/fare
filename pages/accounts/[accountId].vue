<script setup lang="ts">
import { get } from '@vueuse/core'

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

const searchQuery = ref('')
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
      <h2>{{ account?.account.name }}</h2>
    </template>
  </LayoutPageWithList>
</template>
