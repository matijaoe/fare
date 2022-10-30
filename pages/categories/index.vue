<script lang="ts" setup>
import { get } from '@vueuse/core'

setBreadcrumbs([
  { label: 'Categories', href: useRoute().path },
])

const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

const { data: categories } = useCategories()
const { data: categoriesTotals } = useCategoriesTotals(rangeFrom, rangeTo)

const shownCategories = computed(() => {
  const findCategory = (id: string) => categoriesTotals.value?.find(cat => cat.id === id)

  return categories.value?.map((category) => {
    const { totals } = findCategory(category.id) ?? {}
    return { ...category, totals }
  }) ?? []
})

await useFetch('/api/categories', {
  key: 'categories',
})

await useFetch(`/api/categories/totals?from=${get(rangeFrom)}&to=${get(rangeTo)}`, {
  key: `categories-totals-${get(rangeFrom)}-${get(rangeTo)}`,
})
</script>

<template>
  <LayoutPageLayout range>
    <div v-for="category in shownCategories" :key="category.id">
      <h5 font-bold>
        {{ category.name }}
      </h5>
      <div>{{ category.totals }}</div>
    </div>
  </LayoutPageLayout>
</template>
