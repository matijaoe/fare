<script lang="ts" setup>
const mainContentWrapperHeight = computed(() => 'h-[calc(100vh-60px)]')
</script>

<template>
  <div>
    <LayoutSectionWrapper>
      <div w-full flex="~ col xl:row 1" justify-between>
        <div
          max-w="full xl:lg" flex-1
          border="r-2 zinc-2 dark:zinc-9"
        >
          <slot name="list" />
        </div>

        <div
          p-6 pb-32 space-y-12 overflow-y-scroll
          flex-1 order--1 xl:order-1
          :class="mainContentWrapperHeight"
        >
          <slot name="content" />
        </div>
      </div>
    </LayoutSectionWrapper>
  </div>
</template>
