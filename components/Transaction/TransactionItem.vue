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
const formattedAmount = useCurrencyFormat(item.amount)

const transactionTooltip = computed(() => {
  if (get(isTransfer)) {
    return `Transferred ${formattedAmount.value} from ${item.fromAccount!.account.name} to ${item.toAccount!.account.name}`
  }
  if (get(isExpense)) {
    return `Spent ${formattedAmount.value} from ${item.fromAccount!.account.name}`
  }
  if (get(isIncome)) {
    return `Received ${formattedAmount.value} on ${item.toAccount!.account.name}`
  }
})
</script>

<template>
  <div h="125px" p-5 flex flex-col gap-4>
    <!-- Top section -->
    <div flex-1 flex items-center justify-between>
      <div flex items-center gap-3>
        <button
          v-if="item.category"
          @click.stop="navigateTo({
            name: 'categories-categoryId',
            params: { categoryId: item.categoryId },
          })"
        >
          <FBadge
            cursor="pointer"
            type="solid"
            :icon="item.category.icon"
            :color="item.category.color"
            rounded
          >
            {{ item.category.name }}
          </FBadge>
        </button>
        <div flex items-center gap-1>
          <button
            v-if="item.fromAccount"
            @click.stop="navigateTo({
              name: 'accounts-cash-accountId',
              params: { accountId: item.fromAccountId },
            })"
          >
            <FBadge

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
            v-if="item.toAccount"
            @click.stop="navigateTo({
              name: 'accounts-cash-accountId',
              params: { accountId: item.toAccountId },
            })"
          >
            <FBadge
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
        flex justify-between items-center gap-2
        text="xs zinc-4 dark:zinc-4"
      >
        <FTooltip
          flex-center h-full
          :content="timeAgo"
          placement="top"
        >
          <div ml-auto font="normal">
            {{ formattedDate }}
          </div>
        </FTooltip>

        <FTooltip
          placement="top-end"
          :content="transactionTooltip"
          flex-center
          class="translate-y--0.25"
          p-1
        >
          <Icon name="tabler:info-circle" text-xs />
        </FTooltip>
      </div>
    </div>

    <!-- Bottom section -->
    <div flex justify-between items-end gap-12 mt-auto>
      <div text="left" truncate flex flex-col>
        <div text-xl truncate font-sans>
          {{ item.name }}
        </div>
        <div
          font="normal" text="xs zinc-4 dark:zinc-4" truncate mt="1"
          :class="{ 'opacity-0 invisible order--1': !item.description }"
        >
          {{ !!item.description ? item.description : '-' }}
        </div>
      </div>

      <div
        font="display semibold" text-3xl
        flex items-center gap-1
        :class="{
          'text-emerald-5': isIncome,
          'text-indigo-5': isTransfer,
        }"
      >
        <span v-if="isExpense">-</span>
        <span v-else-if="isIncome">+</span>
        {{ formattedAmount }}
      </div>
    </div>
  </div>
</template>

