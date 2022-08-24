<script lang="ts" setup>
import PasswordField from '../components/F/PasswordField.vue'
const loading = ref(false)
const toggleLoading = useToggle(loading)
</script>

<template>
  <div>
    {{ $route.name }}
    <div flex flex-col gap-3>
      <div flex gap-2 items-center>
        <FInput icon="i-tabler-id" icon-placement="left" :loading="loading" />
        <PasswordField :loading="loading" flex-1 />
        <FButton
          variant="primary"
          @click="toggleLoading()"
        >
          test
        </FButton>
      </div>
      <FInput
        icon="i-tabler-id"
        icon-placement="left"
        :loading="loading"
        disabled
      />
      <FInput
        icon="i-tabler-id"
        icon-placement="left"
        :loading="loading"
      />
      <FInput
        icon="i-tabler-check"
        icon-placement="left"
        :loading="loading"
        positive
      />
      <FInput
        icon="i-tabler-id"
        icon-placement="left"
        :loading="loading"
        invalid
      />
    </div>
  </div>
</template>
