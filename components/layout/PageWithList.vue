<script lang="ts" setup>
</script>

<template>
  <div h-full flex flex-col flex-1>
    <LayoutSectionWrapper flex flex-col>
      <div

        flex-1
        w-full flex="~ col xl:row" justify-between
      >
        <div
          flex-1 h="[calc(100vh-60-44pxpx)]"
          max-w="full xl:lg"
          border="r-2 zinc-2 dark:zinc-9"
        >
          <slot name="list" />
        </div>

        <div
          flex-1 h="[calc(100vh-60px)]"
          p-6 pb-32 space-y-12 overflow-y-scroll
          order--1 xl:order-1
        >
          <slot name="content" />
        </div>
      </div>
    </LayoutSectionWrapper>
  </div>
</template>
