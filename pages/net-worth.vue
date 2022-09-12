<script lang="ts" setup>
const loading = ref(false)
const toggleLoading = useToggle(loading)
</script>

<template>
  <div>
    {{ $route.name }}
    <div flex flex-col gap-3>
      <div flex gap-2 items-center>
        <FInput icon="tabler:id" icon-placement="left" :loading="loading" />
        <FPasswordField :loading="loading" flex-1 />
        <FButton
          variant="primary"
          @click="toggleLoading()"
        >
          test
        </FButton>
      </div>
      <FInput
        icon="tabler:id"
        icon-placement="left"
        :loading="loading"
        disabled
      />
      <FInput
        icon="tabler:id"
        icon-placement="left"
        :loading="loading"
      />
      <FInput
        icon="tabler:check"
        icon-placement="left"
        :loading="loading"
        positive
      />
      <FInput
        icon="tabler:id"
        icon-placement="left"
        :loading="loading"
        invalid
      />
      <FInput
        type="date"
        :loading="loading"
      />
    </div>
  </div>
</template>
