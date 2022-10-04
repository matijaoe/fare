<script lang="ts" setup>
import type { Transaction } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'

const ids = ['cl8r634ob0000uu2jh8j5em69', 'cl8q7wa4o0002uujv6mzsh0w6', 'cl8pwezxb0007uut954itam0a']

const id = ref<string>(ids[0])

// const { data: transactions, isLoading } = useTransactions(toRef(store, 'dateRange'))
const { data, isLoading, refetch } = useQuery<Transaction>(
  ['transactions', 'detail', id],
  () => $fetch<Transaction>(`/api/transactions/${id.value}`),
)

const changeId = () => {
  const currentIndex = ids.indexOf(id.value)
  const nextIndex = (currentIndex + 1) % ids.length
  id.value = ids[nextIndex]
}
</script>

<template>
  <div
    flex
    flex-col
    gap-4
    items-start
  >
    <div bg-blue-2>
      <p v-if="isLoading">
        Loading
      </p>
      <pre v-if="data">{{ data }}</pre>
    </div>
    <div bg-sky-2>
      id: {{ id }}
    </div>
    <div flex gap-2>
      <FButton size="sm" variant="info" @click="changeId">
        change id
      </FButton>
      <FButton size="sm" variant="info" @click="changeId">
        change id
      </FButton>
    </div>
  </div>
</template>
