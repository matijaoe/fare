<script setup lang="ts">
import type { Account, Ledger, LedgerCategory } from '@prisma/client'
import { set } from '@vueuse/core'
import { formatCurrency, formatTimeAgo } from '@/utils'

type Props = {
  item: Ledger & { category?: LedgerCategory } & { fromAccount?: Account; toAccount?: Account }
}

const { item } = defineProps<Props>()

type DateFormatType = 'relative' | 'normal'

const dateFormatType = ref<DateFormatType>('normal')

const isDateFormat = (type: DateFormatType) => dateFormatType.value === type

const switchDateFormatType = () => {
  set(dateFormatType, isDateFormat('relative') ? 'normal' : 'relative')
}

const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat('en-US', { dateStyle: 'medium', ...options }).format(new Date(date))
}

const formattedDate = computed(() => isDateFormat('relative') ? formatTimeAgo(item.date) : formatDate(item.date))
const formatedAmount = computed(() => formatCurrency(item.amount))
</script>

<template>
  <FCard white relative>
    <div
      flex
      gap-2
      pos="absolute top--3 left-3"
    >
      <FBadge
        v-if="item.category"
        type="solid"
        :color="item.category.color"
        rounded
      >
        {{ item.category.name }}
      </FBadge>
      <div
        flex
        items-center
        gap-2
      >
        <FBadge
          v-if="item.fromAccount"
          type="dot"
          :color="item.fromAccount.color"
        >
          {{ item.fromAccount.name }}
        </FBadge>
      </div>
    </div>
    <div
      flex
      flex-col
      gap-4
    >
      <div
        flex
        justify-between
        items-start
      >
        <!-- <div text-2xl truncate>
          {{ item.name }}
        </div> -->
        <button ml-auto @click="switchDateFormatType">
          <div
            text="sm"
            opacity-40
          >
            {{ formattedDate }}
          </div>
        </button>
      </div>
      <div
        flex
        justify-between
        items-center
        gap-6
      >
        <div text-2xl truncate font="display">
          {{ item.name }}
        </div>

        <div font="display" text-3xl>
          {{ formatedAmount }}
        </div>
      </div>
    </div>
  </FCard>
</template>

