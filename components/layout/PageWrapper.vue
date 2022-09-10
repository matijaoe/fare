<script setup lang="ts">
type Props = {
  title?: string
  subtitle?: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <div flex flex-col gap-6>
    <div
      v-if="$slots.title || title"
    >
      <slot name="title">
        <h1
          flex
          items-center
          gap-3
          text-2xl
          font-bold
          uppercase
        >
          <Icon v-if="icon" :name="icon" />
          {{ title }}
        </h1>
        <p
          v-if="subtitle"
          mt="1.5"
          ml="1"
          text="sm zinc-5 dark:zinc-4"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>
    <div>
      <slot />
    </div>
  </div>
</template>

