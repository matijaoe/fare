<script lang="ts" setup>
const opened = ref(false)
</script>

<template>
  <div>
    {{ $route.name }}
    <div>
      <FButton
        type="button"
        @click="opened = true"
      >
        Open dialog
      </FButton>
    </div>

    <ModalBase
      v-model="opened"
      title="Enter your expenses"
      description="Lorem, ipsum dolor sit amet consectetur adipisicing elit."
      closable
    >
      <p>
        Placeat dolor corrupti, tempore dicta doloremque atque illum et architecto vel sequi officiis sunt voluptate aperiam dolores non ipsum enim iusto aliquam!
        Reprehenderit enim minima, labore unde reiciendis, nobis adipisci sunt magnam praesentium provident fuga. Incidunt, aspernatur expedita! Doloribus provident nobis tempora! Natus aspernatur aliquam exercitationem commodi earum porro? Odit, quisquam possimus!
      </p>
    </ModalBase>
  </div>
</template>
