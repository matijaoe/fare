<script lang="ts" setup>
import PasswordField from '../components/F/PasswordField.vue'
const loading = ref(false)
const toggleLoading = useToggle(loading)
</script>

<template>
  <div>
    {{ $route.name }}
    <div flex flex-col gap-3>
      <FInput icon="i-tabler-id" icon-placement="left" :loading="loading" />
      <div flex gap-2 items-center>
        <PasswordField :loading="loading" flex-1 />
        <FButton
          variant="primary"
          @click="toggleLoading()"
        >
          test
        </FButton>
      </div>
    </div>
  </div>
</template>
