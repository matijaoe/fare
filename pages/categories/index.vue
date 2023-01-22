<script lang="ts" setup>
import { useCategoryModal } from '~~/store/modal/category-modal.store'

const categoryModal = useCategoryModal()
const { monthQuery, isAllTime } = toRefs(useDateRangeStore())

const { data: categories } = useCategories()
const { data: categoriesTotals, isLoading: isTotalsLoading } = useCategoriesTotals(monthQuery)

const shownCategories = computed(() => {
  const findCategory = (id: string) => categoriesTotals.value?.find(cat => cat.id === id)

  return categories.value?.map((category) => {
    const { totals } = findCategory(category.id) ?? {}
    return { ...category, totals }
  }) ?? []
})

const deviceStore = useDeviceStore()
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
          {{ deviceStore.isMobileOrTablet ? 'Create' : 'Create category' }}
        </FButton>
      </template>

      <div grid lg:grid-cols-2 gap-3>
        <template v-if="shownCategories?.length">
          <CategoryCard
            v-for="category in shownCategories"
            :key="category"
            :category="category"
            :totals="category.totals"
            :all-time="isAllTime"
            :totals-loading="isTotalsLoading"
          />
        </template>

        <FCardEmpty v-else>
          <p>No categories yet</p>

          <div flex gap-2 items-center mt-4>
            <FButton
              to="/transactions"
              variant="primary"
              @click="categoryModal.launch()"
            >
              Add your first category
            </FButton>
          </div>
        </FCardEmpty>
      </div>
    </LayoutSectionWrapper>
  </LayoutPage>
</template>
