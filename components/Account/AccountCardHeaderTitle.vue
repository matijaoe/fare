<script lang="ts" setup>
import type { MoneyAccount } from '@prisma/client'

const props = defineProps<{
  account: MoneyAccount
}>()

const { bg1, color4 } = useAppColors(props.account.color)
</script>

<template>
  <div flex items-center gap-4>
    <div flex items-center justify-start w-5 h-5 aspect-square relative>
      <div
        absolute class="top--50% left-50% translate--50% filter-saturate-80 opacity-100 dark:opacity-25" w-full h-full p-30 rounded-full
        :class="[bg1]"
      />
      <Icon
        mt="-.25"
        :name="account.icon ?? 'tabler:cash'"
        :class="[color4]"
        z-2
      />
    </div>
    <p z-2 font="display medium" uppercase text-base class="group-hover:underline">
      {{ account.name }}
    </p>
  </div>
</template>
