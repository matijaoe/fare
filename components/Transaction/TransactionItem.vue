<script setup lang="ts">
import type { TransactionType } from '@prisma/client'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transactions'

type Props = {
  item: TransactionWithCategoryAndCashAccount
}

const { item } = defineProps<Props>()

const { isExpense, isTransfer, isIncome } = useTransactionData(item)

const timeAgo = useTimeAgo(item.date)
const formattedDate = useDateFormat(item.date)
const formatedAmount = useCurrencyFormat(item.amount)
</script>

<template>
  <div
    p-5
    flex
    flex-col
    gap-4
  >
    <div flex items-center justify-between>
      <div
        flex
        items-center
        gap-3
      >
        <FBadge
          v-if="item.category"
          cursor="pointer"
          type="solid"
          :icon="item.category.icon"
          :color="item.category.color"
          rounded
        >
          {{ item.category.name }}
        </FBadge>
        <div
          flex
          items-center
          gap-1
        >
          <FBadge
            v-if="item.fromAccount"
            cursor="pointer"
            type="dot"
            :icon="item.fromAccount.account.icon"
            :color="item.fromAccount.account.color"
            @click="navigateTo('/accounts')"
          >
            {{ item.fromAccount.account.name }}
          </FBadge>
          <Icon v-if="isTransfer" name="tabler:arrow-right" text-sm />
          <FBadge
            v-if="item.toAccount"
            cursor="pointer"
            type="dot"
            :icon="item.toAccount.account.icon"
            :color="item.toAccount.account.color"
            @click="navigateTo('/accounts')"
          >
            {{ item.toAccount.account.name }}
          </FBadge>
        </div>
      </div>
      <div
        flex
        justify-between
        items-start
      >
        <FTooltip :content="timeAgo" placement="right">
          <div
            ml-auto
            font="normal"
            text="xs zinc-4 dark:zinc-4"
          >
            {{ formattedDate }}
          </div>
        </FTooltip>
      </div>
    </div>
    <div
      flex
      justify-between
      items-end
      gap-12
    >
      <div
        text="left"
        truncate
      >
        <div
          text-xl
          truncate
          font="sans light"
          uppercase
        >
          {{ item.name }}
        </div>
        <div
          v-if="item.description"
          text-xs
          truncate
          font="normal"
          text="zinc-4 dark:zinc-4"
          mt="1"
        >
          {{ item.description }}
        </div>
      </div>

      <div
        font="display"
        text-3xl
        flex
        items-center
        gap-1
        :class="{
          'text-emerald-5': isIncome,
          'text-indigo-5': isTransfer,
        }"
      >
        <span v-if="isExpense">-</span>
        <span v-else-if="isIncome">+</span>
        {{ formatedAmount }}
      </div>
    </div>
  </div>
</template>

