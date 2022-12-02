<script lang="ts" setup>
const { compoundedNetWorthForNextYears } = useFireCalculation()
</script>

<template>
  <LayoutPage>
    FIRE

    <div flex flex-col gap-4>
      <pre>{{ compoundedNetWorthForNextYears }}</pre>
    </div>
  </LayoutPage>
</template>
