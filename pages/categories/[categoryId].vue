<script lang="ts" setup>
import type { Category } from '@prisma/client'

const route = useRoute()

const categoryId = route.params.categoryId as string

const { data: category, isLoading } = useCategory(categoryId)

whenever(category, () => setBreadcrumbs([
  { label: 'Categories', href: { name: 'categories' } },
  { label: category.value?.name || categoryId, href: route.path },
]), { immediate: true })

await useFetch<Category>(`/api/categories/${categoryId}`, { key: `category-${categoryId}` })
</script>

<template>
  <LayoutPageLayout>
    category - {{ $route.params.categoryId }}
    <pre bg-zinc-2>
      {{ category }}
    </pre>
  </LayoutPageLayout>
</template>
