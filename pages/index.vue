<script lang="ts" setup>
</script>

<template>
  <div
    flex
    flex-col
    gap-6
  >
    <div flex items-center gap-3>
      <Icon i-tabler-plane />
      <h1>Dashboard</h1>
    </div>
    <div flex="~ col sm:row gap-2">
      <FCard>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, vero iure harum eaque molestias et hic eius exercitationem dolor cupiditate! Labore provident dicta at ab accusantium. Dicta sint iste minus.
      </FCard>
      <FCard filled>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id dolores tempora ad nobis culpa doloribus? Doloremque sit explicabo ducimus quaerat, fuga aliquam tempora provident hic libero atque repudiandae dolore! Possimus?
      </FCard>
    </div>
    <div
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
          Play
        </FButton>
        <FButton
          variant="secondary"
          size="lg"
          block
          icon="i-tabler-bluetooth-off"
        >
          Disconnect
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
            Eat
          </FButton>
          <FButton
            variant="secondary"
            icon="i-tabler-edit"
            icon-placement="right"
          >
            Edit
          </FButton>
          <FButton variant="subtle">
            <template #left>
              <Icon i-tabler-archive />
            </template>
            Archive
          </FButton>
          <FButton variant="outline" icon="i-tabler-info-circle">
            Info
          </FButton>
          <FButton variant="danger">
            Discard
          </FButton>
          <FButton variant="warning" icon="i-tabler-error-404">
            Warning
          </FButton>
          <FButton variant="success">
            Apply
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
            Play
          </FButton>
          <FButton variant="secondary" size="sm" loading>
            Calculate
          </FButton>
          <FButton variant="subtle" size="sm" loading>
            Export
          </FButton>
          <FButton
            variant="outline"
            size="sm"
            loading
            icon="i-tabler-clipboard"
          >
            Copy
          </FButton>
          <FButton
            variant="danger"
            size="sm"
            loading
          >
            Discard
          </FButton>
          <FButton variant="warning" size="sm" loading>
            Warning
          </FButton>
          <FButton variant="success" size="sm" loading>
            Apply
          </FButton>
        </div>
      </div>
      <div
        flex
        gap-4
        items-center
        mt-8
      >
        <FButton
          variant="primary"
          icon="i-tabler-cookie"
          icon-only
          size="lg"
        />
        <FButton
          variant="success"
          icon="i-tabler-cookie"
          icon-only
          circle
          size="lg"
        />
        <FButton
          variant="secondary"
          icon="i-tabler-id"
          circle
          size="lg"
          icon-placement="right"
          casing="none"
        >
          ID
        </FButton>
      </div>
    </div>
  </div>
</template>
