<script setup lang="ts">
const { isDark, toggleDark } = useTheme()

const { user, signOut } = useAuth()

const signOutHandler = async () => {
  // don't reload page, manually navigate
  await signOut({ redirect: false })
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
        class="lt-sm:!p-4"
        icon-only
        @click="toggleDark()"
      >
        <template #icon>
          <Icon :name="isDark ? 'tabler:sun' : 'tabler:moon'" text="xl sm:base" />
        </template>
      </FButton>
    </FTooltip>
    <FTooltip content="Source code">
      <a href="https://github.com/mat2ja/fare" target="_blank">
        <FButton
          variant="secondary"
          size="lg"
          circle
          class="lt-sm:!p-4"
          icon-only
        >
          <template #icon>
            <Icon name="tabler:brand-github" text="xl sm:base" />
          </template>
        </FButton>
      </a>
    </FTooltip>
    <FTooltip content="Sign out">
      <FButton
        variant="secondary"
        size="lg"
        circle
        class="lt-sm:!p-4"
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
