<script lang="ts" setup>
const cashAccountStore = useCashAccountModal()
const { rangeFrom, rangeTo, isAllTime } = toRefs(useDateRangeStore())

const { data: reportData, isLoading } = useCashAccountsTotals(rangeFrom, rangeTo)

const total = computed(() => reportData.value?.totalBalance || 0)
const formattedTotal = useCurrencyFormat(total)
</script>

<template>
  <div flex flex-col gap-4>
    <DateSwitchHeader />

    <div
      my-4
      flex="~ col gap-2"
      translate-y="0.4"
    >
      <span
        uppercase
        font="sans medium"
        text="sm zinc-4 dark:zinc-5"
        class="leading-tight"
      >
        Total balance
      </span>

      <div
        text-6xl
        font="display medium"
      >
        <div
          v-if="isLoading"
          flex
          gap-4
          items-center
          class="color-base-lighter"
        >
          <!-- TODO: seperate endpoint for total balance, so it doesnt reload on each range change -->
          <span>
            Calculating
          </span>
          <FLoader text-4xl />
        </div>
        <h4 v-else>
          {{ formattedTotal }}
        </h4>
      </div>
    </div>

    <LayoutSectionWrapper title="Cash accounts" subtitle="Actively tracked accounts" mt-3>
      <template #right>
        <FButton variant="secondary" @click="cashAccountStore.launch()">
          Add account
        </FButton>
      </template>
      <div
        v-if="reportData?.accounts.length"
        class="custom-grid"
        gap-3
      >
        <AccountCard
          v-for="account in reportData.accounts"
          :key="`${account.id}.${rangeFrom}.${rangeTo}.${isAllTime ? 'allTime' : 'range'}`"
          :cash-account="account"
          :all-time="isAllTime"
          @click="navigateTo({
            name: 'accounts-accountId',
            params: { accountId: account.id },
          })"
        />
      </div>
    </LayoutSectionWrapper>
  </div>
</template>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
