<script lang="ts" setup>
import type { Category } from '@prisma/client'
import type { CategoryTotals } from '~~/models/resources/category'

const { category, totals } = defineProps<{
  category: Category
  totals: CategoryTotals
  totalsLoading?: boolean
  allTime?: boolean
}>()

const categoryModal = useCategoryModal()

const { bg50, borderClr3, text9, bg3 } = useAppColors(category.color)

const formattedTotalNet = totals?.totalNet != null ? useCurrencyFormat(totals.totalNet) : '€XXX.XX'
const formattedNet = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'always' }) : '€XXX.XX'
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income, { signDisplay: 'always' }) : '€XXX.XX'
const formattedExpense = totals?.expense != null ? useCurrencyFormat(-totals.expense) : '€XXX.XX'

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)
</script>

<template>
  <FCard
    ref="card"
    white
    class="!pl-0 pb-0"
  >
    <div
      flex
      justify-between
      items-center
      p-2
      pl-6
      border="~ !dotted !2 !l-0"
      rounded="r-full"
      :class="[bg50, borderClr3, text9]"
    >
      <TransitionFade>
        <FSkeleton v-if="totalsLoading" w-20 h="32px" />
        <p
          v-if="!totalsLoading"
          order--1
          class="translate-y-.25"
          text-2xl
          font="display medium"
        >
          {{ allTime
            ? (totals?.totalNet > 0 ? '+' : '')
            : (totals?.net > 0 ? '+' : '') }}{{ allTime ? formattedTotalNet : formattedNet }}
        </p>
      </TransitionFade>

      <div
        ml-auto
        flex
        gap-3
        items-center
      >
        <h4 text-base font-medium>
          {{ category.name }}
        </h4>
        <div
          w-max
          aspect-square
          text-lg
          p-2
          rounded-full
          flex-center
          :class="[bg3]"
        >
          <Icon :name="category?.icon" />
        </div>
      </div>
    </div>

    <div
      flex
      items-end
      justify-between
      p-5
      pr-1
    >
      <div
        justify-start
        flex
        items-center
        gap-8
      >
        <div>
          <p
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            leading-tight
          >
            Earned
          </p>
          <div
            text-xl
            min-w-18
            flex
            justify-start
          >
            <TransitionFade>
              <FSkeleton v-if="totalsLoading" w-full h="28px" />
              <span
                v-else-if="isDefined(totals)"
                font-mono
                flex
                items-center
              >
                {{ formattedIncome }}
              </span>
            </TransitionFade>
          </div>
        </div>

        <div pl-5>
          <p
            uppercase
            font="sans medium"
            text="10px zinc-4 dark:zinc-5"
            leading-tight
            text-right
          >
            Spent
          </p>
          <div
            text-xl
            min-w-18
            flex
            justify-end
          >
            <TransitionFade>
              <FSkeleton v-if="totalsLoading" w-full h="28px" />
              <span
                v-else-if="isDefined(totals)"
                font-mono
                flex
                items-center
              >
                {{ formattedExpense }}
              </span>
            </TransitionFade>
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
