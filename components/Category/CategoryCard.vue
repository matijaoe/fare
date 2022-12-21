<script lang="ts" setup>
import type { CategoryTotals, CategoryWithCount } from '~~/models/resources'

const { category, totals } = defineProps<{
  category: CategoryWithCount
  totals: CategoryTotals
  totalsLoading?: boolean
  allTime?: boolean
}>()

const categoryModal = useCategoryModal()

const { bg50, borderClr3, color9, bg3 } = useAppColors(category.color)

const formattedTotalNet = totals?.totalNet != null ? useCurrencyFormat(totals.totalNet, { signDisplay: 'exceptZero' }) : null
const formattedNet = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'exceptZero' }) : null
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income) : null
const formattedExpense = totals?.expense != null ? useCurrencyFormat(totals.expense) : null

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)

const { isDark } = useTheme()
</script>

<template>
  <FCard
    ref="card"
    white
    paddingless
    class="!pt-5"
  >
    <div
      flex justify-between items-center
      px-6 py-3
      border="~ dotted y-2 x-0 dark:0"
      class="dark:bg-zinc-50/4"
      :class="isDark ? [] : [bg50, borderClr3, color9]"
    >
      <NuxtLink :to="`/categories/${category.id}`" class="group" mr-auto>
        <div ml-auto flex gap-3 items-center>
          <div
            w-max aspect-square text-lg p-2 rounded-full flex-center
            :class="[bg3]"
          >
            <Icon :name="category?.icon" dark:text-zinc-9 />
          </div>
          <h4 text-base font-medium class="group-hover:underline">
            {{ category.name }}
          </h4>
        </div>
      </NuxtLink>

      <transition-fade>
        <p
          v-if="!totalsLoading"
          ml-auto
          class="translate-y-.25"
          text-2xl
          font="display medium"
        >
          {{ allTime ? formattedTotalNet : formattedNet }}
        </p>
      </transition-fade>
    </div>

    <div flex items-end justify-between p-6>
      <div flex gap-14 items-end>
        <div flex justify-start items-center gap-8>
          <div>
            <BasicLabel size="xs">
              Earned
            </BasicLabel>
            <div text-xl min-w-18 flex justify-start>
              <TransitionFade>
                <FSkeleton v-if="totalsLoading" variant="lighter" w-full h="28px" />
                <span
                  v-else-if="isDefined(totals)"
                  font-mono flex items-center
                >
                  {{ formattedIncome }}
                </span>
              </TransitionFade>
            </div>
          </div>

          <div pl-5>
            <BasicLabel size="xs">
              Spent
            </BasicLabel>
            <div text-xl min-w-18 flex justify-end>
              <TransitionFade>
                <FSkeleton v-if="totalsLoading" variant="lighter" w-full h="28px" />
                <span
                  v-else-if="isDefined(totals)"
                  font-mono flex items-center
                >
                  {{ formattedExpense }}
                </span>
              </TransitionFade>
            </div>
          </div>
        </div>
      </div>

      <div>
        <FButton
          v-show="isHovered"
          icon="tabler:edit"
          variant="subtle"
          size="sm"
          @click.stop="categoryModal.launch(category)"
        >
          Edit
        </FButton>
      </div>
    </div>
  </FCard>
</template>
