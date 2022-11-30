<script lang="ts" setup>
const route = useRoute()

const categoryId = route.params.categoryId as string

const { monthQuery } = toRefs(useDateRangeStore())
const { data: category, isLoading: isCategoryLoading } = useCategory(categoryId)
const { data: categoryWithTotals, isLoading: isTotalsLoading } = useCategoryTotals(categoryId, monthQuery)

const { data: categoryWithTransactions, isLoading: isTransactionsLoading } = useCategoryWithTransactions(categoryId, monthQuery)

const { transactions, searchQuery } = useTransactionFilters(
  computed(() => categoryWithTransactions.value?.transactions),
)

whenever(category, () => setBreadcrumbs([
  { label: 'Categories', href: { name: 'categories' } },
  { label: category.value?.name || categoryId, href: route.path },
]), { immediate: true })

const { bg3 } = useAppColors(computed(() => category.value?.color))

const modal = useCategoryModal()

const totals = computed(() => categoryWithTotals.value?.totals)

const net = computed(() => totals.value?.net ?? 0)
const expense = computed(() => totals.value?.expense ?? 0)
const income = computed(() => totals.value?.income ?? 0)

const formattedNet = useCurrencyFormat(net, { signDisplay: 'exceptZero' })
const formattedExpense = useCurrencyFormat(expense)
const formattedIncome = useCurrencyFormat(income)
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
        border="b-2"
        border-base
      />
      <TransactionList
        :transactions="transactions"
        :loading="isTransactionsLoading"
      />
    </template>

    <template #content>
      <div>
        <div flex items-center justify-between>
          <div flex items-center gap-6>
            <div class="w-75.2px h-75.2px" aspect-square text-4xl p-4 rounded-full flex-center :class="[bg3]">
              <Icon v-if="category" :name="category?.icon" dark:text-white />
            </div>
            <div space-y-2>
              <TransitionFade>
                <FSkeleton
                  v-if="isCategoryLoading"
                  class="h-36px w-100px"
                />
                <h2 v-else text-3xl font-bold>
                  {{ category?.name }}
                </h2>
              </TransitionFade>
              <FBadge icon="tabler:packages" color="gray" rounded>
                Category
              </FBadge>
            </div>
          </div>
          <FButton icon="tabler:edit" variant="subtle" @click="modal.launch(category)">
            Edit
          </FButton>
        </div>

        <div flex items-end justify-between gap-4 mt-8>
          <div space-y-1 flex-1>
            <span uppercase font="sans medium" text="xs zinc-4 dark:zinc-5">
              Net
            </span>

            <div flex items-center gap-5>
              <TransitionFade>
                <FSkeleton
                  v-if="isTotalsLoading"
                  class="h-40px w-50"
                />
                <p
                  v-else-if="isDefined(totals)"
                  text-4xl font="display medium"
                >
                  {{ formattedNet }}
                </p>
              </TransitionFade>
            </div>
          </div>

          <div flex justify-center items-end gap-8 divide-x-2 divide-zinc-2 dark:divide-zinc-8 font-mono>
            <FTooltip content="Income" placement="top-end">
              <div flex items-center gap-4>
                <div text-lg text-right space-y="0.5">
                  <TransitionFade>
                    <FSkeleton v-if="isTotalsLoading" w-22 h="28px" />
                    <span v-else-if="isDefined(totals)">
                      {{ formattedIncome }}
                    </span>
                  </TransitionFade>
                </div>

                <div
                  bg-zinc-2 text-zinc-9
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
                    <span v-else-if="isDefined(totals)">
                      {{ formattedExpense }}
                    </span>
                  </TransitionFade>
                </div>

                <div
                  bg-zinc-2 text-zinc-9
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
      </div>
    </template>
  </LayoutPageWithList>
</template>
