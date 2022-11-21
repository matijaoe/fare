<script lang="ts" setup>
import { get } from '@vueuse/core'
import { useCategoryModal } from '~~/store/modal/category-modal.store'

onMounted(() => setBreadcrumbs([
  { label: 'Categories', href: useRoute().path },
]))

const categoryModal = useCategoryModal()
const { rangeFrom, rangeTo, isAllTime } = toRefs(useDateRangeStore())

const { data: categories } = useCategories()
const { data: categoriesTotals, isLoading: isTotalsLoading } = useCategoriesTotals(rangeFrom, rangeTo)

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
  <LayoutPage>
    <LayoutSectionWrapper title="Categories" desc=" All your transactions across categories" mt-3>
      <template #right>
        <FButton
          variant="secondary"
          icon-placement="left"
          @click="categoryModal.launch()"
        >
          Create category
        </FButton>
      </template>

      <div grid lg:grid-cols-2 gap-3>
        <CategoryCard
          v-for="category in shownCategories"
          :key="category"
          :category="category"
          :totals="category.totals"
          :all-time="isAllTime"
          :totals-loading="isTotalsLoading"
        />
      </div>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
