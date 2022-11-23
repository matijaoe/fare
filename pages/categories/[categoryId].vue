<script lang="ts" setup>
import type { Category } from '@prisma/client'

const route = useRoute()

const categoryId = route.params.categoryId as string

const { data: category, isLoading } = useCategory(categoryId)

whenever(category, () => setBreadcrumbs([
  { label: 'Categories', href: { name: 'categories' } },
  { label: category.value?.name || categoryId, href: route.path },
]), { immediate: true })

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
        :transactions="category?.transactions"
        :loading="isLoading"
      />
    </template>

    <template #content>
      <h2>{{ category?.name }}</h2>
    </template>
  </LayoutPageWithList>
</template>
