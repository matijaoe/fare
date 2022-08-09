<script lang="ts" setup>
const router = useRouter()
</script>

<template>
  <div
    flex
    flex-col
    gap-8
    items-center
  >
    <p text-2xl font-bold>
      Ovo je moj homepage
    </p>
    <button
      flex
      gap-2
      items-center
      px-4
      py-2
      class="bg-green-300/40 hover:bg-green-300/90 dark:bg-red-600/40 dark:hover:bg-red-600/90 rounded cursor-pointer"
      @click="router.push({ name: 'help' })"
    >
      get some help
      <i
        i-carbon-arrow-right
        block
      />
    </button>
  </div>
</template>
