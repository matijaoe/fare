<script lang="ts" setup>

</script>

<template>
  <LayoutSectionWrapper pb-18>
    <div relative>
      <DateSwitchHeader mb-6 />

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
          <LedgerEntriesList />
        </div>
        <div
          text="right"
          flex-1
        />
      </div>

      <LedgerAddEntryBar
        fixed
        pos="bottom-6 right-6"
      />
    </div>
  </LayoutSectionWrapper>
</template>
