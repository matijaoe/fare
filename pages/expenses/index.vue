<script lang="ts" setup>
</script>

<template>
  <LayoutPageWrapper>
    <div
      grid
      grid-cols-3
      w-full
      mb-8
    >
      <div>fd</div>
      <p flex="center" font="bold" text="2xl">
        September
      </p>
      <div text="right">
        fd
      </div>
    </div>

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
