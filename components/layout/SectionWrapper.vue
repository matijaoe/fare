<script setup lang="ts">
type Props = {
  title?: string
  subtitle?: string
  icon?: string
}

defineProps<Props>()
</script>

<template>
  <section flex flex-col gap-5>
    <div
      v-if="$slots.title || title || $slots.right"
      flex items-start justify-between
    >
      <div v-if="$slots.title || title">
        <slot name="title">
          <h1
            flex items-center gap-3
            text-2xl font="sans semibold" uppercase
          >
            <Icon v-if="icon" :name="icon" />
            {{ title }}
          </h1>
          <p
            v-if="subtitle"
            mt="1"
            text="sm zinc-4 dark:zinc-5"
          >
            {{ subtitle }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.right" ml-auto>
        <slot name="right" />
      </div>
    </div>
    <div>
      <slot />
    </div>
  </section>
</template>

