<script setup lang="ts">
const { smDown } = useBreakpoints()
const { isDark, toggleDark } = useTheme()

const { user, signOut } = await useAuth()

const signOutHandler = async () => {
  await signOut()
  navigateTo({ name: 'login' })
}
</script>

<template>
  <div
    v-bind="$attrs"
    mt-auto w-full px-3
    grid="sm:~ sm:cols-4 sm:gap-1"
    flex="~ gap-5 wrap"
    class="justify-center items-center sm:justify-items-center"
  >
    <button>
      <img
        v-if="user"
        rounded-full
        :src="user!.image"
        w="60px sm:50.8px"
        aspect-square
      >
    </button>
    <FTooltip content="Toggle theme">
      <FButton
        variant="secondary"
        size="lg"
        circle
        :class="{
          '!p-4': smDown,
        }"
        icon-only
        @click="toggleDark()"
      >
        <template #icon>
          <Icon :name="isDark ? 'tabler:sun' : 'tabler:moon'" text="xl sm:base" />
        </template>
      </FButton>
    </FTooltip>
    <FTooltip content="Settings">
      <FButton
        variant="secondary"
        size="lg"
        circle
        :class="{ '!p-4': smDown }"
        icon-only
      >
        <template #icon>
          <Icon name="tabler:settings" text="xl sm:base" />
        </template>
      </FButton>
    </FTooltip>
    <FTooltip content="Sign out">
      <FButton
        variant="secondary"
        size="lg"
        circle
        :class="{
          '!p-4': smDown,
        }"
        icon-only
        @click="signOutHandler"
      >
        <template #icon>
          <Icon name="tabler:logout" text="xl sm:base" />
        </template>
      </FButton>
    </FTooltip>
  </div>
</template>
