<script lang="ts" setup>
import type { Category } from '@prisma/client'
import type { CategoryWithTotals } from '~~/models/resources/category'

const { category } = defineProps<{
  category: CategoryWithTotals
  loading?: boolean
}>()

const { isAllTime } = toRefs(useDateRangeStore())

const totals = $computed(() => category.totals)

const { bg50, borderClr3, text9, bg3 } = useAppColors(category.color)

const formattedTotalNet = totals?.totalNet != null ? useCurrencyFormat(totals.totalNet) : '€XXX.XX'
const formattedNet = totals?.net != null ? useCurrencyFormat(totals.net, { signDisplay: 'always' }) : '€XXX.XX'
const formattedIncome = totals?.income != null ? useCurrencyFormat(totals.income, { signDisplay: 'always' }) : '€XXX.XX'
const formattedExpense = totals?.expense != null ? useCurrencyFormat(-totals.expense) : '€XXX.XX'
</script>

<template>
  <FCard white class="!pl-0 pb-0">
    <div>
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
        <div
          flex
          gap-4
          items-center
        >
          <h4 text-xl font-medium>
            {{ category.name }}
          </h4>
          <div
            w-max
            aspect-square
            text-xl
            p-3
            rounded-full
            flex-center
            :class="[bg3]"
          >
            <Icon :name="category.icon" />
          </div>
        </div>
        <p
          order--1
          class="translate-y-.25"
          text-3xl
          font="display medium"
        >
          {{ isAllTime
            ? (totals.totalNet > 0 ? '+' : '')
            : (totals.net > 0 ? '+' : '') }}{{ isAllTime ? formattedTotalNet : formattedNet }}
        </p>
      </div>
      <div
        pr-5
        justify-start
        flex
        items-center
        gap-8
        p-6
      >
        <div>
          <p
            uppercase
            font="sans medium"
            text="xs zinc-4 dark:zinc-5"
            leading-tight
          >
            Earned
          </p>
          <div text-xl>
            <TransitionFade>
              <FSkeleton v-if="loading" w-22 h="32px" />
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

        <div>
          <p
            uppercase
            font="sans medium"
            text="xs zinc-4 dark:zinc-5"
            leading-tight
            text-right
          >
            Spent
          </p>
          <div text-xl>
            <TransitionFade>
              <FSkeleton v-if="loading" w-22 h="32px" />
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
    </div>
  </FCard>
</template>
