<script lang="ts" setup>
const { isDark } = useTheme()
</script>

<template>
  <FCard
    :white="!isDark"
    :filled="isDark"
    neobrutal
  >
    <slot>
      Nothing here yet
    </slot>
  </FCard>
</template>
