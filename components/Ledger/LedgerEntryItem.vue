<script setup lang="ts">
import type { Ledger } from '@prisma/client'
import { set } from '@vueuse/core'
import { formatCurrency, formatTimeAgo } from '@/utils'

type Props = {
  item: Ledger
}

const { item } = defineProps<Props>()

type DateFormatType = 'relative' | 'normal'

const dateFormatType = ref<DateFormatType>('normal')

const isDateFormat = (type: DateFormatType) => dateFormatType.value === type

const switchDateFormatType = () => {
  set(dateFormatType, isDateFormat('relative') ? 'normal' : 'relative')
}

const formatDate = (date: Date | string, options?: Intl.DateTimeFormatOptions) => {
  return Intl.DateTimeFormat('en-US', { dateStyle: 'full', ...options }).format(new Date(date))
}

const formattedDate = computed(() => isDateFormat('relative') ? formatTimeAgo(item.date) : formatDate(item.date))
const formatedAmount = computed(() => formatCurrency(item.amount))
</script>

<template>
  <FCard>
    <div flex flex-col gap-4>
      <div
        flex
        justify-between
        w-full
      >
        <div flex gap-2>
          <FBadge icon="tabler:pizza">
            food
          </FBadge>
          <FBadge type="solid" color="red">
            work
          </FBadge>
        </div>
        <button @click="switchDateFormatType">
          <div
            text="sm"
            opacity-40
          >
            {{ formattedDate }}
          </div>
        </button>
      </div>
      <div text-2xl>
        {{ item.name }}
      </div>

      <div font="bold" text-3xl>
        {{ formatedAmount }}
      </div>
    </div>
  </FCard>
</template>

