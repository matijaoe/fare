<script lang="ts" setup>
defineProps<{
  label: string
  loading: boolean
  netWorth: string
  cash: string
  investments: string
  dimmed?: boolean
}>()
</script>

<template>
  <article>
    <div flex="~ col gap-2">
      <BasicLabel>
        {{ label }}
      </BasicLabel>
      <div flex gap-2 items-center>
        <FSkeleton
          v-if="loading"
          class="h-60px w-220px"
        />
        <p
          v-else-if="netWorth" text-6xl font-display font-medium
          :class="{ 'text-zinc-4 dark:text-zinc-5': dimmed }"
        >
          {{ netWorth }}
        </p>
      </div>
    </div>

    <div mt-2>
      <div flex items-end gap-2 font-mono>
        <FSkeleton
          v-if="loading"
          class="h-16px w-72px"
          m="t-1 b-1"
        />
        <p
          v-else font-medium
          :class="{ 'text-zinc-4 dark:text-zinc-5': dimmed }"
        >
          {{ cash }}
        </p>
        <p text="zinc-4 dark:text-zinc-5 sm" mb="0.25">
          in cash
        </p>
      </div>

      <div flex items-end gap-2 font-mono>
        <FSkeleton
          v-if="loading"
          class="h-16px w-80px"
          m="t-1 b-1"
        />
        <p
          v-else font-medium
          :class="{ 'text-zinc-4 dark:text-zinc-5': dimmed }"
        >
          {{ investments }}
        </p>
        <p
          text="zinc-4 sm" mb="0.25"
        >
          in investments
        </p>
      </div>
    </div>
  </article>
</template>
