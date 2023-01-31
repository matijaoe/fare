<script setup lang="ts">
import { get } from '@vueuse/core'

const route = useRoute()

const accountId = $computed(() => route.params.accountId as string)

const { isAllTime, monthQuery } = toRefs(useDateRangeStore())

const { data: cashAccount, isLoading: isAccountLoading } = useCashAccount(accountId)
const { data: cashAccountWithTotals, isLoading: isTotalsLoading } = useCashAccountTotals(accountId, monthQuery)
const { data: cashAccountWithBalance, isLoading: isBalanceLoading } = useCashAccountTotalsBalance(accountId)

const account = $computed(() => cashAccount.value?.account)
const { data: accountWithTransactions, isLoading: isTransactionsLoading } = useCashAccountWithTransactions(accountId, monthQuery)

const fullAccountTransactions = computed(() => {
  if (isDefined(accountWithTransactions)) {
    const { paymentFromAccount, paymentToAccount } = get(accountWithTransactions)
    return [...paymentFromAccount, ...paymentToAccount]
  }
  return []
})

const { transactions, searchQuery } = useTransactionFilters(fullAccountTransactions)

const { bg3 } = useAppColors(computed(() => cashAccount.value?.account.color))

const modal = useCashAccountModal()

const totals = computed(() => cashAccountWithTotals.value?.totals)

const balance = computed(() => cashAccountWithBalance.value?.balance ?? 0)
const net = computed(() => totals.value?.net ?? 0)
const expense = computed(() => totals.value?.expense ?? 0)
const income = computed(() => totals.value?.income ?? 0)

const formattedBalance = useCurrencyFormat(balance)
const formattedNet = useCurrencyFormat(net, { signDisplay: 'exceptZero' })
const formattedExpense = useCurrencyFormat(expense)
const formattedIncome = useCurrencyFormat(income)

whenever(cashAccount, () => setBreadcrumbs([
  { label: 'Accounts', href: { name: 'accounts' } },
  { label: cashAccount.value?.account?.name ?? accountId, href: route.path },
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
        input-class="rounded-none !bg-white !dark:bg-zinc-9 !py-5"
        border="b-2" border-base
      />
      <TransactionList
        v-if="transactions"
        :transactions="transactions"
        :loading="isTransactionsLoading"
      />
    </template>

    <template #content>
      <div>
        <div flex items-center justify-between>
          <div flex items-center gap-6>
            <div class="w-75.2px h-75.2px" aspect-square text-4xl p-4 rounded-full flex-center :class="[bg3]">
              <Icon v-if="account" :name="account?.icon ?? 'tabler:cash'" dark:text-white />
            </div>
            <div space-y-2>
              <TransitionFade>
                <FSkeleton
                  v-if="isAccountLoading"
                  class="h-36px w-100px"
                />
                <h2 v-else text-3xl font-bold>
                  {{ account?.name }}
                </h2>
              </TransitionFade>
              <FBadge icon="tabler:cash" color="green">
                Cash account
              </FBadge>
            </div>
          </div>
          <FButton icon="tabler:edit" variant="subtle" @click="modal.launch(account)">
            Edit
          </FButton>
        </div>

        <div mt-8 space-y-2>
          <div flex items-end justify-between gap-4>
            <div space-y-1 flex-1>
              <span uppercase font="sans medium" text="xs zinc-4 dark:zinc-5">
                Balance
              </span>

              <div flex items-center gap-5>
                <TransitionFade>
                  <FSkeleton
                    v-if="isBalanceLoading"
                    class="h-40px w-40"
                  />
                  <p
                    v-else-if="cashAccountWithBalance"
                    text-4xl font="display medium"
                  >
                    {{ formattedBalance }}
                  </p>
                </TransitionFade>
              </div>
            </div>

            <div flex justify-center items-end gap-8 divide-x-2 divide-zinc-2 dark:divide-zinc-8 font-mono>
              <FTooltip content="Income" placement="top-end">
                <div flex items-center gap-4 pl-5>
                  <div text-lg text-right space-y="0.5">
                    <TransitionFade>
                      <FSkeleton v-if="isTotalsLoading" w-22 h="28px" />
                      <span v-else-if="totals">
                        {{ formattedIncome }}
                      </span>
                    </TransitionFade>
                  </div>

                  <div
                    bg-emerald-2 text-emerald-9
                    ring="2 offset 2 current"
                    flex-center flex-shrink-0
                    p-2 rounded-full aspect-square
                  >
                    <Icon name="tabler:arrow-down-left" sm />
                  </div>
                </div>
              </FTooltip>

              <FTooltip content="Expenses" placement="top-end">
                <div flex items-center gap-4 pl-5>
                  <div text="lg right" space-y="0.5">
                    <TransitionFade>
                      <FSkeleton v-if="isTotalsLoading" w-22 h="28px" />
                      <span v-else-if="totals">
                        {{ formattedExpense }}
                      </span>
                    </TransitionFade>
                  </div>

                  <div
                    bg-rose-2 text-rose-9
                    ring="2 offset 2 current"
                    flex-center flex-shrink-0
                    p-2 rounded-full aspect-square
                  >
                    <Icon name="tabler:arrow-up-right" sm />
                  </div>
                </div>
              </FTooltip>
            </div>
          </div>

          <div v-if="!isAllTime" flex items-center gap-5>
            <TransitionFade>
              <FSkeleton
                v-if="isBalanceLoading || isTotalsLoading"
                class="h-40px w-45"
              />
              <p
                v-else-if="formattedNet"
                text-4xl text-zinc-4 dark:text-zinc-6
                font="display medium"
              >
                {{ formattedNet }} <span text-base>this month</span>
              </p>
            </TransitionFade>
          </div>
        </div>
      </div>
    </template>
  </LayoutPageWithList>
</template>
