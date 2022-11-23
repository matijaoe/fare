<script lang="ts" setup>
const route = useRoute()

const categoryId = route.params.categoryId as string

const { data: category, isLoading } = useCategory(categoryId)

const { transactions, searchQuery } = useTransactionFilters(
  computed(() => category.value?.transactions),
)

whenever(category, () => setBreadcrumbs([
  { label: 'Categories', href: { name: 'categories' } },
  { label: category.value?.name || categoryId, href: route.path },
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
      <h2 text-3xl font-bold>
        {{ category?.name }}
      </h2>
    </template>
  </LayoutPageWithList>
</template>
