<template>
  <Transition name="y-slide" mode="out-in">
    <slot />
  </Transition>
</template>

<style>
.y-slide-enter-active,
.y-slide-leave-active {
  transition: opacity 250ms ease;
}

.y-slide-from,
.y-slide-leave-to {
  opacity: 0;
}
</style>
