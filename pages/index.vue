<script lang="ts" setup>
onMounted(() => setBreadcrumbs([
  { label: 'Dashboard', href: { name: 'index' } },
]))

const { isLoading: isNetWorthLoading, netWorth, netWorthFormatted } = useNetWorth()
</script>

<template>
  <LayoutPage>
    <div grid grid-cols-4>
      <FCard white padingless class="!p-1">
        <div flex="~ col gap-0.5" p="4 y-3">
          <p text="xs zinc-4" font="sans medium" uppercase>
            Net worth
          </p>
          <div flex gap-2 items-center>
            <FSkeleton
              v-if="isNetWorthLoading"
              class="h-36px w-30"
            />
            <p v-else-if="netWorth" text-3xl font-display font-medium>
              {{ netWorthFormatted }}
            </p>
          </div>
        </div>
      </FCard>
    </div>
  </LayoutPage>
</template>
