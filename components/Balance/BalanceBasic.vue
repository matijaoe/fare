<script lang="ts" setup>
defineProps<{
  label: string
  loading: boolean
  balance: string
  dimmed?: boolean
}>()
</script>

<template>
  <article flex="~ col gap-2">
    <BasicLabel>
      {{ label }}
    </BasicLabel>

    <div font="display medium" text-6xl>
      <div v-if="loading" flex gap-4 items-center>
        <FSkeleton class="h-60px w-60" />
      </div>
      <p v-else :class="{ 'text-zinc-4 dark:text-zinc-5': dimmed }">
        {{ balance }}
      </p>
    </div>
  </article>
</template>
