<script lang="ts" setup>
</script>

<template>
  <LayoutPageWrapper title="Expense tracker" subtitle="Track every penny" icon="tabler:receipt">
    <div grid grid-cols-3 gap-4>
      <FCard
        flex
        justify-center
        text-xl
        uppercase
        class="!py-10"
      >
        Income
      </FCard>
      <FCard
        flex
        justify-center
        text-xl
        uppercase
        class="!py-10"
        filled
      >
        Expense
      </FCard>
      <FCard
        flex
        justify-center
        text-xl
        uppercase
        class="!py-10"
      >
        Transfer
      </FCard>
    </div>
    <LedgerEntriesList mt-8 />
  </LayoutPageWrapper>
</template>
