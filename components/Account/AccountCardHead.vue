<script lang="ts" setup>
import type { MoneyAccount } from '@prisma/client'
import type { RouteLocationRaw } from 'vue-router'

defineProps<{
  account: MoneyAccount
  to?: RouteLocationRaw
  showEdit?: boolean
}>()

defineEmits<{
  (e: 'edit'): void
}>()
</script>

<template>
  <div flex justify-between items-center w-full>
    <NuxtLink v-if="to" :to="to " class="group">
      <AccountCardHeaderTitle :account="account" />
    </NuxtLink>

    <template v-else>
      <AccountCardHeaderTitle :account="account" />
    </template>

    <div>
      <FTooltip content="Edit" placement="top">
        <button @click.stop="$emit('edit')">
          <Icon v-show="showEdit" text="zinc-6 dark:zinc-5" name="tabler:edit" />
        </button>
      </FTooltip>
    </div>
  </div>
</template>
