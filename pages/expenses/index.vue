<script lang="ts" setup>
const loading = ref(false)
</script>

<template>
  <div>
    <h1>
      {{ $route.name }}
    </h1>
    <div
      my-8
      flex
      items-center
      gap-3
    >
      <FButton
        :loading="loading"
        @click="loading = true"
      >
        Add expense
      </FButton>
      <FButton
        variant="danger"
        uppercase
        @click="loading = false"
      >
        stop
      </FButton>
      <FButton
        icon="i-tabler-hand-stop"
        circle
        icon-only
        variant="secondary"
        :loading="loading"
        @click="loading = false"
      />
    </div>
    <FSelectField />
  </div>
</template>
