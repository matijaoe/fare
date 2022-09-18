<script lang="ts" setup>

</script>

<template>
  <LayoutPageWrapper pb-18>
    <div relative>
      <DateSwitchHeader />

      <div
        w-full
        flex="~ col md:row"
        justify-between
        gap-8
        mt-8
      >
        <div
          max-w="full sm:base md:lg lg:2xl"
          flex-1
        >
          <LedgerEntriesList redesign />
        </div>
        <div
          text="right"
          flex-1
        >
        <!-- <LedgerEntriesList /> -->
        </div>
      </div>

      <div
        fixed
        pos="bottom-6 right-6"
        flex
        gap-2
      >
        <FButton
          icon-only
          icon="tabler:arrow-down-left"
          size="xl"
          circle
          variant="success"
          class="!shadow-xl"
        />
        <FButton
          icon-only
          icon="tabler:arrow-up-right"
          size="xl"
          circle
          variant="rose"
          class="!shadow-xl"
        />
        <FButton
          icon-only
          icon="tabler:arrows-exchange"
          size="xl"
          circle
          variant="info"
          class="!shadow-xl"
        />
        <!-- <FButton
          uppercase
          size="lg"
          variant="success"
          class="!rounded-r-none !border-r-1"
          flex-1
        >
          Income
        </FButton>
        <FButton
          uppercase
          size="lg"
          variant="warning"
          class="!rounded-0 !border-x-1"
          flex-1
        >
          Expense
        </FButton>
        <FButton
          uppercase
          size="lg"
          variant="info"
          class="!rounded-l-none !border-l-1"
          flex-1
        >
          Transfer
        </FButton> -->
      </div>
    </div>
  </LayoutPageWrapper>
</template>
