<script lang="ts" setup>
</script>

<template>
  <div>
    <div flex items-center gap-3>
      <Icon i-ph-airplane-fill />
      <h1>Home</h1>
    </div>
    <div
      mt-8
      flex
      flex-col
      gap-2
      items-start
    >
      <FButton variant="primary">
        play
      </FButton>
      <FButton variant="secondary">
        calculate
      </FButton>
      <FButton variant="tertiary">
        export
      </FButton>
      <FButton variant="outline">
        info
      </FButton>
      <FButton variant="danger">
        discard
      </FButton>
      <FButton variant="success">
        apply
      </FButton>
      <!-- small -->
      <h1 mt-4>
        Small buttons
      </h1>
      <FButton variant="primary" size="sm">
        play
      </FButton>
      <FButton variant="secondary" size="sm">
        calculate
      </FButton>
      <FButton variant="tertiary" size="sm">
        export
      </FButton>
      <FButton variant="outline" size="sm">
        info
      </FButton>
      <FButton variant="danger" size="sm">
        discard
      </FButton>
      <FButton variant="success" size="sm">
        apply
      </FButton>
    </div>
  </div>
</template>

