<script lang="ts" setup>
defineProps<{
  loading?: boolean
  hasAccounts?: boolean
}>()
</script>

<template>
  <div class="custom-grid" gap-4>
    <template v-if="loading">
      <FSkeleton
        v-for="i in 3"
        :key="i"
        aspect="2/1 sm:4/3"
      />
    </template>

    <template v-else-if="hasAccounts">
      <slot />
    </template>

    <FCardEmpty v-else>
      Nothing here yet
    </FCardEmpty>
  </div>
</template>

<style scoped>
.custom-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}
</style>
