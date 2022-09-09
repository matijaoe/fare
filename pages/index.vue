<script lang="ts" setup>
const loading = ref(false)
const toggleLoading = useToggle(loading)

const address = ref('bestovje')
const pw = ref('hunter32')

const testerFn = (type: 'blur' | 'input' | 'focus') => {
  console.log(type)
}
</script>

<template>
  <div flex flex-col gap-3>
    <div flex items-center gap-3>
      <Icon name="tabler:plane" />
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
    <div flex flex-col gap-3>
      <div flex gap-2 items-center>
        <FPasswordField v-model="pw" :loading="loading" flex-1 />
        <FButton
          variant="primary"
          @click="toggleLoading()"
        >
          test
        </FButton>
      </div>
      <FInput
        v-model="address"
        icon="tabler:id"
        icon-placement="left"
        :loading="loading"
        disabled
      />
      <div flex gap-3>
        <FInput
          v-model="address"
          hint="napravi kajgod"
          label="Address"
          icon="tabler:id"
          icon-placement="left"
          :loading="loading"
          @blur="testerFn('blur')"
          @focus="testerFn('focus')"
          @input="testerFn('input')"
        />
        <FInput
          icon="tabler:check"
          label="Address"
          icon-placement="left"
          :loading="loading"
          positive
        >
          <template #label>
            <div flex items-center gap-1>
              <Icon name="tabler:alarm" /> labela
            </div>
          </template>
          <template #hint>
            <div flex items-center gap-1>
              ovo je moj hint <Icon name="tabler:check" />
            </div>
          </template>
        </FInput>
        <FInput
          icon="tabler:id"
          label="Address"
          icon-placement="left"
          :loading="loading"
          invalid
          error="This is required"
        >
          <template #label>
            <div
              flex
              items-center
              gap-1
              capitalize
            >
              <Icon name="tabler:alarm" /> labela
            </div>
          </template>
        </FInput>
      </div>
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
      <div
        flex
        gap-2
        w-full
        flex-wrap
      >
        <FButton
          variant="primary"
          size="lg"
          icon="tabler:play"
          icon-placement="right"
          @click="address = 'krapina'"
        >
          change address
        </FButton>
        <FButton
          variant="secondary"
          size="lg"
          block
          icon="tabler:bluetooth-off"
        >
          Disconnect
        </FButton>
        <FButton
          variant="outline"
          size="lg"
          block
          icon="tabler:calendar"
        >
          Schedule
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
          <FButton variant="primary" icon="tabler:cookie">
            Eat
          </FButton>
          <FButton
            variant="secondary"
            icon="tabler:edit"
            icon-placement="right"
          >
            Edit
          </FButton>
          <FButton variant="subtle">
            <template #left>
              <Icon name="tabler:archive" />
            </template>
            Archive
          </FButton>
          <FButton variant="outline" icon="tabler:info-circle">
            Info
          </FButton>
          <FButton variant="danger">
            Discard
          </FButton>
          <FButton variant="warning" icon="tabler:error-404">
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
            icon="tabler:clipboard"
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
          icon="tabler:cookie"
          icon-only
          size="lg"
        />
        <FButton
          variant="success"
          icon="tabler:cookie"
          icon-only
          circle
          size="lg"
        />
        <FButton
          variant="secondary"
          icon="tabler:id"
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
