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
      <h1 mt-4>
        Large
      </h1>
      <!-- Large -->
      <div flex gap-2 w-full>
        <FButton
          variant="primary"
          size="lg"
          icon="i-tabler-play"
          icon-placement="right"
        >
          play
        </FButton>
        <FButton
          variant="secondary"
          size="lg"
          block
          icon="i-tabler-bluetooth-off"
        >
          disconnect
        </FButton>
      </div>

      <div
        grid
        grid-cols-3
        gap-4
      >
        <!-- Medium -->
        <div
          flex
          flex-col
          gap-2
          items-start
        >
          <h1 mt-4>
            Medium
          </h1>
          <FButton variant="primary" icon="i-tabler-cookie">
            eat
          </FButton>
          <FButton
            variant="secondary"
            icon="i-tabler-edit"
            icon-placement="right"
          >
            edit
          </FButton>
          <FButton variant="subtle">
            <template #left>
              <Icon i-tabler-archive />
            </template>
            archive
          </FButton>
          <FButton variant="outline" icon="i-tabler-info-circle">
            info
          </FButton>
          <FButton variant="danger">
            discard
          </FButton>
          <FButton variant="warning" icon="i-tabler-error-404">
            warning
          </FButton>
          <FButton variant="success">
            apply
          </FButton>
        </div>

        <!-- small -->
        <div
          flex
          flex-col
          gap-2
          items-start
        >
          <h1 mt-4>
            Small
          </h1>
          <FButton variant="primary" size="sm" loading>
            play
          </FButton>
          <FButton variant="secondary" size="sm" loading>
            calculate
          </FButton>
          <FButton variant="subtle" size="sm" loading>
            export
          </FButton>
          <FButton
            variant="outline"
            size="sm"
            loading
            icon="i-tabler-clipboard"
          >
            copy
          </FButton>
          <FButton
            variant="danger"
            size="sm"
            loading
          >
            discard
          </FButton>
          <FButton variant="warning" size="sm" loading>
            warning
          </FButton>
          <FButton variant="success" size="sm" loading>
            apply
          </FButton>
        </div>

        <div
          flex
          flex-col
          gap-2
          items-start
        >
          <!-- xtra small -->
          <div
            flex
            flex-col
            gap-2
            items-start
          >
            <h1 mt-4>
              XSmall
            </h1>
            <FButton variant="primary" size="xs">
              play
            </FButton>
            <FButton variant="secondary" size="xs">
              calculate
            </FButton>
            <FButton variant="subtle" size="xs">
              export
            </FButton>
            <FButton variant="outline" size="xs" icon="i-tabler-clipboard">
              copy
            </FButton>
            <FButton variant="danger" size="xs">
              discard
            </FButton>
            <FButton variant="warning" size="xs">
              warning
            </FButton>
            <FButton variant="success" size="xs">
              apply
            </FButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

