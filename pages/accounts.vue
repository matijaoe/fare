<script lang="ts" setup>
const { rangeFrom, rangeTo } = toRefs(useDateRangeStore())

const { data: cashAccounts } = useAccountsTotals(rangeFrom, rangeTo)
</script>

<template>
  <div flex flex-col gap-4>
    <DateSwitchHeader />

    <LayoutSectionWrapper title="Cash accounts" subtitle="Actively tracked accounts" mt-3>
      <div
        v-if="cashAccounts?.length"
        class="custom-grid"
        gap-3
      >
        <AccountCard
          v-for="account in cashAccounts"
          :key="account.id"
          :cash-account="account"
        />
      </div>
    </LayoutSectionWrapper>

    <LayoutSectionWrapper title="Investment accounts" mt-8>
      kajgod
    </LayoutSectionWrapper>
  </div>
</template>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
