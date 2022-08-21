<script setup lang="ts">
const { smDown } = useBreakpoints()

const icons = [
  {
    icon: 'i-tabler-moon',
  },
  {
    icon: 'i-tabler-settings',
  },
  {
    icon: 'i-tabler-logout',
  },
]
</script>

<template>
  <div
    mt-auto
    w-full
    grid="sm:~ sm:cols-4 sm:gap-3"
    flex="~ gap-5 wrap"
    class="justify-center items-center sm:justify-items-center"
    px-5
  >
    <button>
      <img
        src="https://source.boringavatars.com/marble/50"
        w="52.6px sm:47.2px"
        aspect-square
      >
    </button>
    <FButton
      v-for="{ icon } in icons"
      :key="icon"
      variant="secondary"
      size="lg"
      circle
      :class="{
        '!p-4': smDown,
      }"
      icon-only
    >
      <template #icon>
        <Icon :class="icon" text="xl sm:base" />
      </template>
    </FButton>
  </div>
</template>
