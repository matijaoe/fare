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
        />
      </div>

      <div
        fixed
        pos="bottom-6 right-6"
        flex
        gap-2
      >
        <FTooltip content="Income">
          <FButton
            icon-only
            icon="tabler:arrow-down-left"
            size="xl"
            circle
            variant="success"
            class="!shadow-xl !filter-grayscale-60 !hover:filter-grayscale-0"
          />
        </FTooltip>
        <FTooltip content="Expense">
          <FButton
            icon-only
            icon="tabler:arrow-up-right"
            size="xl"
            circle
            variant="teal"
            class="!shadow-xl !filter-grayscale-40 !hover:filter-grayscale-0"
          />
        </FTooltip>
        <FTooltip content="Transfer">
          <FButton
            icon-only
            icon="tabler:arrows-exchange"
            size="xl"
            circle
            variant="info"
            class="!shadow-xl !filter-grayscale-80 !hover:filter-grayscale-0"
          />
        </FTooltip>
      </div>
    </div>
  </LayoutPageWrapper>
</template>
