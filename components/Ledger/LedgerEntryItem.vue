<script setup lang="ts">
import type { Ledger } from '@prisma/client'
import { set } from '@vueuse/core'
import { formatTimeAgo } from '@/utils/dates'

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
</script>

<template>
  <FCard>
    <div flex flex-col gap-2>
      <div
        flex
        justify-between
        w-full
      >
        <div font="bold" text-2xl>
          ${{ item.amount }}
        </div>
        <button @click="switchDateFormatType">
          <div
            text="sm"
            opacity-25
          >
            {{ formattedDate }}
          </div>
        </button>
      </div>
      <div>{{ item.description }}</div>
      <div flex gap-2>
        <FBadge icon="tabler:pizza">
          food
        </FBadge>
        <FBadge>work</FBadge>
      </div>
    </div>
  </FCard>
</template>

