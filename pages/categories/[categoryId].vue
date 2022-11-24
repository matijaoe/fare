<script lang="ts" setup>
const route = useRoute()

const categoryId = route.params.categoryId as string

const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())
const { data: category } = useCategory(categoryId)
const { data: categoryWithTotals } = useCategoryTotals(categoryId, rangeFrom, rangeTo)

const { data: categoryWithTransactions, isLoading } = useCategoryWithTransactions(categoryId, rangeFrom, rangeTo)

const { transactions, searchQuery } = useTransactionFilters(
  computed(() => categoryWithTransactions.value?.transactions),
)

whenever(category, () => setBreadcrumbs([
  { label: 'Categories', href: { name: 'categories' } },
  { label: category.value?.name || categoryId, href: route.path },
]), { immediate: true })

const { bg3 } = useAppColors(computed(() => category.value?.color))

const modal = useCategoryModal()
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
              <Icon :name="category?.icon" />
            </div>
            <h2 text-3xl font-bold>
              {{ category?.name }}
            </h2>
          </div>
          <FButton icon="tabler:edit" variant="subtle" @click="modal.launch(category)">
            Edit
          </FButton>
        </div>
        <pre> {{ categoryWithTotals }}</pre>
      </div>
    </template>
  </LayoutPageWithList>
</template>
