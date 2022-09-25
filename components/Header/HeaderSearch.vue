<script setup lang="ts">

</script>

<template>
  <div
    flex-1
    flex
    relative
    max-w="xs"
    h-full
  >
    <input
      type="text"
      h-full
      w-full
      placeholder="Search"
      p="x-5 l-13"
      flex
      items-center
      gap-4
      class="color-base placeholder-zinc-4/65 placeholder-shown:font-normal bg-transparent"
      outline="none focus:none"
    >
    <Icon
      name="tabler:search"
      absolute
      pos="top-50% left-5"
      class="-translate-y-50%"
    />
  </div>
</template>
