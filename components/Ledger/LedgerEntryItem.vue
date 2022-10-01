<script setup lang="ts">
import type { Account, Category, Lekdger, TransactionType } from '@prisma/client'
import { set } from '@vueuse/core'
import { formatCurrency, formatTimeAgo } from '@/utils'

type Props = {
  item: Ledger &
  { category?: Category } &
  {
    fromAccount?: { account: Account }
    toAccount?: { account: Account }
  }
}

const { item } = defineProps<Props>()

const isType = (type: TransactionType) => type === item.type

type DateFormatType = 'relative' | 'normal'
const dateFormatType = ref<DateFormatType>('normal')
const isDateFormat = (type: DateFormatType) => dateFormatType.value === type

const switchDateFormatType = () => {
  if (isDateFormat('relative')) {
    set(dateFormatType, 'normal')
  } else {
    set(dateFormatType, 'relative')
    setTimeout(() => {
      set(dateFormatType, 'normal')
    }, 2500)
  }
}

const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat('en-US', { dateStyle: 'medium', ...options }).format(new Date(date))
}

const formattedDate = computed(() => isDateFormat('relative') ? formatTimeAgo(item.date) : formatDate(item.date))
const formatedAmount = computed(() => formatCurrency(item.amount))

console.log('props.item :>> ', props.item)
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
          <Icon v-if="isType('Transfer')" name="tabler:arrow-right" text-sm />
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
        <button
          ml-auto
          :title="formatTimeAgo(item.date)"
          @click="switchDateFormatType"
        >
          <div
            font="normal"
            text="xs zinc-4 dark:zinc-4"
          >
            {{ formattedDate }}
          </div>
        </button>
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
          'text-emerald-5': isType('Income'),
          'text-indigo-5': isType('Transfer'),
        }"
      >
        <span v-if="isType('Expense')">-</span>
        <span v-else-if="isType('Income')">+</span>
        {{ formatedAmount }}
      </div>
    </div>
  </div>
</template>

