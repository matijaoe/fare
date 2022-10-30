<script lang="ts" setup>
import type { Category } from '@prisma/client'

// TODO: fucked up page transition because it switches layouts
setBreadcrumbs([
  { label: 'Categories', href: 'categories' },
])

const route = useRoute()

const categoryId = route.params.categoryId as string

const { data: category, isLoading } = useCategory(categoryId)

watch(category, () => setBreadcrumbs([
  { label: 'Categories', href: { name: 'categories' } },
  { label: category.value?.name || categoryId, href: route.path },
]), { immediate: true })

await useFetch<Category>(`/api/categories/${categoryId}`, { key: `category-${categoryId}` })
</script>

<template>
  <div bg-blue-4>
    category - {{ $route.params.categoryId }}
    <pre bg-zinc-2>
      {{ category }}
    </pre>
  </div>
</template>
