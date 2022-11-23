<script setup lang="ts">
defineProps<{
  title?: string
  desc?: string
  icon?: string
}>()
</script>

<template>
  <section flex flex-col gap-5 flex-1 h-full>
    <div
      v-if="$slots.title || title || $slots.right || desc"
      flex items-start justify-between
    >
      <div v-if="$slots.title || title || desc" space-y-1>
        <slot name="title">
          <h1
            flex items-center gap-3
            text-2xl font="sans semibold" uppercase
          >
            <Icon v-if="icon" :name="icon" />
            {{ title }}
          </h1>
          <p
            v-if="desc"
            text="sm zinc-4 dark:zinc-5"
          >
            {{ desc }}
          </p>
        </slot>
      </div>
      <div v-if="$slots.right" ml-auto>
        <slot name="right" />
      </div>
    </div>
    <div space-y-5>
      <slot />
    </div>
  </section>
</template>

