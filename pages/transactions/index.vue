<script lang="ts" setup>
import { get } from '@vueuse/core'

onMounted(() => setBreadcrumbs([
  { label: 'Transactions', href: useRoute().path },
]))

const { rangeFrom, rangeTo, isAllTime } = toRefs(useDateRangeStore())
const { transactions, query } = toRefs(useTransactionsStore())
const { data: totals, isLoading: isTotalsLoading } = useTransactionTotalsPerRange(rangeFrom, rangeTo)

// const isLoading = computed(() => {
//   if (isTotalsLoading.value) {
//     const id = setTimeout(() => {
//       console.log('id :>> ', id)
//       clearTimeout(id)
//       return isTotalsLoading.value
//     }, 100)
//   }
//   return false
// })

// TODO: what is the best way
await useFetch(() => `/api/transactions/totals?from=${get(rangeFrom.value)}&to=${get(rangeTo)}`, {
  key: `transactions-totals-${get(rangeFrom.value)}-${get(rangeTo)}`,
})

// Fucks things up?
// await useFetch(() => `/api/transactions?from=${get(rangeFrom)}&to=${get(rangeTo)}`, {
//   key: `transactions-${get(rangeFrom)}-${get(rangeTo)}`,
// })

const net = computed(() => totals.value?.net ?? 0)
const expense = computed(() => isDefined(totals) ? -totals.value.expense : 0)
const income = computed(() => totals.value?.income ?? 0)

const formattedNet = useCurrencyFormat(net, { signDisplay: 'always' })
const formattedExpense = useCurrencyFormat(expense, { signDisplay: 'always' })
const formattedIncome = useCurrencyFormat(income, { signDisplay: 'always' })
</script>

<template>
  <LayoutPageLayout range pb-18>
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
        Cashflow
      </span>

      <div
        text-6xl
        font="display medium"
        h="60px"
      >
        <Transition mode="out-in">
          <div
            v-if="isTotalsLoading"
            flex
            gap-4
            items-center
            class="color-base-lighter"
            h-full
          >
            <!-- TODO: skeleton instead of xxx -->
            <FSkeleton class="h-full w-50" />
          </div>
          <h4 v-else>
            {{ formattedNet }}
          </h4>
        </Transition>
      </div>
      <div flex items-center gap-6>
        <div flex="~ col">
          <div
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="isAllTime">Total earned</span>
            <span v-else>Earned this month</span>
          </div>
          <span font-mono>
            <FLoader v-if="isTotalsLoading" />
            <span v-else-if="totals">
              {{ formattedIncome }}
            </span></span>
        </div>
        <div flex="~ col">
          <div
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            class="leading-tight"
          >
            <span v-if="isAllTime">Total spent</span>
            <span v-else>spent this month</span>
          </div>
          <span font-mono>
            <FLoader v-if="isTotalsLoading" />
            <span v-else-if="totals">
              {{ formattedExpense }}
            </span></span>
        </div>
      </div>
    </div>

    <LayoutSectionWrapper>
      <div
        w-full
        flex="~ col xl:row"
        justify-between
        gap-6
        flex-1
      >
        <div
          max-w="full xl:base"
          flex-1
        >
          <TransactionList :transactions="transactions" :loading="query.isFetching" />
        </div>
        <div flex-1 class="order--1 xl:order-1">
          <TransactionFilters />
        </div>
      </div>
    </LayoutSectionWrapper>
  </LayoutPageLayout>
</template>
