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

const formattedTotalNet = totals?.totalNet != null ? useCurrencyFormat(totals.totalNet) : '€XXX.XX'
const formattedNet = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'always' }) : '€XXX.XX'
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income, { signDisplay: 'always' }) : '€XXX.XX'
const formattedExpense = totals?.expense != null ? useCurrencyFormat(totals.expense) : '€XXX.XX'

const card = ref<HTMLElement>()
const isHovered = useElementHover(card)
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
      px-6 py-2
      border="~ dotted y-2 x-0"
      :class="[bg50, borderClr3, color9]"
    >
      <NuxtLink :to="`/categories/${category.id}`" class="group" mr-auto>
        <div ml-auto flex gap-3 items-center>
          <div
            w-max aspect-square text-lg p-2 rounded-full flex-center
            :class="[bg3]"
          >
            <Icon :name="category?.icon" />
          </div>
          <h4 text-base font-medium class="group-hover:underline">
            {{ category.name }}
          </h4>
        </div>
      </NuxtLink>

      <TransitionFade>
        <p
          v-if="!totalsLoading"
          ml-auto
          class="translate-y-.25"
          text-2xl
          font="display medium"
        >
          {{ allTime
            ? (totals?.totalNet > 0 ? '+' : '')
            : (totals?.net > 0 ? '+' : '') }}{{ allTime ? formattedTotalNet : formattedNet }}
        </p>
      </TransitionFade>
    </div>

    <div flex items-end justify-between p-6>
      <div flex gap-14 items-end>
        <div flex justify-start items-center gap-8>
          <div>
            <p font="sans medium" text="10px zinc-4 dark:zinc-5" leading-tight uppercase>
              Earned
            </p>
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
            <p font="sans medium" text="10px right zinc-4 dark:zinc-5" leading-tight uppercase>
              Spent
            </p>
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

        <div>
          <!-- TODO: count is not correct, it counts all-time -->
          <!-- should have seperate endpoint just as with totals -->
          <!-- {{ transactionCount }} {{ transactionCount.toString().at(-1) === '1' ? 'transaction' : 'transactions' }} -->
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
