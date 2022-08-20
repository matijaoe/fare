<script lang="ts" setup>

</script>

<template>
  <div
    bg="stone-1"
    text="stone-9"
    min-h="screen"
  >
    <LayoutHeader />
    <LayoutSidebar />
    <div
      p-4
      ml-280px
    >
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>
