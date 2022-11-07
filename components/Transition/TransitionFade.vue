<template>
  <Transition name="fade" mode="out-in">
    <slot />
  </Transition>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 250ms ease;
}

.v-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
