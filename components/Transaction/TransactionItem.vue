<script setup lang="ts">
import { get } from '@vueuse/core'
import type { TransactionWithCategoryAndCashAccount } from '~~/models/resources/transaction'

type Props = {
  item: TransactionWithCategoryAndCashAccount
}

const { item } = defineProps<Props>()

const { isExpense, isTransfer, isIncome } = useTransactionData(item)

const timeAgo = useTimeAgo(item.date)
const formattedDate = useDateFormat(item.date)
const formatedAmount = useCurrencyFormat(item.amount)

const transactionTooltip = computed(() => {
  if (get(isTransfer)) {
    return `Transfered ${formatedAmount.value} from ${item.fromAccount!.account.name} to ${item.toAccount!.account.name}`
  }
  if (get(isExpense)) {
    return `Spent ${formatedAmount.value} from ${item.fromAccount!.account.name}`
  }
  if (get(isIncome)) {
    return `Received ${formatedAmount.value} on ${item.toAccount!.account.name}`
  }
})
</script>

<template>
  <div
    p-5
    flex
    flex-col
    gap-4
  >
    <!-- Top section -->
    <div flex items-center justify-between>
      <div
        flex
        items-center
        gap-3
      >
        <button
          v-if="item.categoryId"
          @click.stop="navigateTo({
            name: 'categories-categoryId',
            params: { categoryId: item.categoryId },
          })"
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
        </button>
        <div
          flex
          items-center
          gap-1
        >
          <button
            @click.stop="navigateTo({
              name: 'accounts-accountId',
              params: { accountId: item.fromAccountId },
            })"
          >
            <FBadge
              v-if="item.fromAccount"
              cursor="pointer"
              type="dot"
              :icon="item.fromAccount.account.icon"
              :color="item.fromAccount.account.color"
            >
              {{ item.fromAccount.account.name }}
            </FBadge>
          </button>
          <Icon v-if="isTransfer" name="tabler:arrow-right" text-sm />
          <button
            @click.stop="navigateTo({
              name: 'accounts-accountId',
              params: { accountId: item.toAccountId },
            })"
          >
            <FBadge
              v-if="item.toAccount"
              cursor="pointer"
              type="dot"
              :icon="item.toAccount.account.icon"
              :color="item.toAccount.account.color"
            >
              {{ item.toAccount.account.name }}
            </FBadge>
          </button>
        </div>
      </div>

      <div
        flex
        justify-between
        items-center
        gap-3
        text="xs zinc-4 dark:zinc-4"
      >
        <FTooltip
          flex-center
          h-full
          :content="timeAgo"
          placement="top-end"
        >
          <div
            ml-auto
            font="normal"
          >
            {{ formattedDate }}
          </div>
        </FTooltip>

        <FTooltip
          flex-center
          placement="top"
          :content="transactionTooltip"
          class="translate-y--0.25"
        >
          <Icon name="tabler:info-circle" text-xs />
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
          font="sans"
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
        font="display semibold"
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

