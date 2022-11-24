<script setup lang="ts">
import { get } from '@vueuse/core'

const route = useRoute()

const accountId = $computed(() => route.params.accountId as string)

const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

const { data: cashAccount } = useCashAccount(accountId)
const { data: cashAccountWithTotals } = useCashAccountTotals(accountId, rangeFrom, rangeTo)

const account = $computed(() => cashAccount.value?.account)
const { data: accountWithTransactions, isLoading } = useCashAccountWithTransactions(accountId, rangeFrom, rangeTo)

const fullAccountTransactions = computed(() => {
  if (isDefined(accountWithTransactions)) {
    const { paymentFromAccount, paymentToAccount } = get(accountWithTransactions)
    return [...paymentFromAccount, ...paymentToAccount]
  }
  return []
})

const { transactions, searchQuery } = useTransactionFilters(fullAccountTransactions)

whenever(cashAccount, () => setBreadcrumbs([
  { label: 'Accounts', href: { name: 'accounts' } },
  { label: cashAccount.value?.account?.name ?? accountId, href: route.path },
]), { immediate: true })

const { bg50, borderClr3, color9, color4, bg3, bg1 } = useAppColors(computed(() => cashAccount.value?.account.color))

const modal = useCashAccountModal()
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
      <div>
        <div flex items-center justify-between>
          <div flex items-center gap-6>
            <div
              w-max aspect-square text-2xl p-4 rounded-full flex-center
              :class="[bg3]"
            >
              <Icon :name="account?.icon" />
            </div>
            <h2 text-3xl font-bold>
              {{ account?.name }}
            </h2>
          </div>
          <FButton icon="tabler:edit" variant="subtle" @click="modal.launch(account)">
            Edit
          </FButton>
        </div>
        <pre>{{ cashAccountWithTotals }}</pre>
      </div>
    </template>
  </LayoutPageWithList>
</template>
