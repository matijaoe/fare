<script setup lang="ts">
import type { TippyContent } from 'vue-tippy'
import { useTippy } from 'vue-tippy'
import type { Placement } from '@popperjs/core'
import 'tippy.js/themes/material.css'

type Props = {
  content: TippyContent
  placement?: Placement
  trigger?: 'mouseenter focus' | 'click' | 'focusin' | 'mouseenter click' | 'manual'
  interactive?: boolean
  hideOnClick?: boolean | 'toggle'
  interactiveBorder?: number
  interactiveDebounce?: number
  offset?: number
  inertia?: boolean
  arrow?: boolean
  theme?: string
}

const props = withDefaults(defineProps<Props>(), {
  placement: 'top',
  trigger: 'mouseenter focus',
  arrow: true,
  hideOnClick: true,
  offset: 16,
  interactiveBorder: 10,
  interactiveDebounce: 1000,
  inertia: false,
  theme: 'light',
})

const target = ref()
useTippy(target, {
  content: props.content,
  placement: props.placement,
  trigger: props.trigger,
  interactive: props.interactive,
  theme: props.theme,
  hideOnClick: props.hideOnClick,
  interactiveBorder: props.interactiveBorder,
  interactiveDebounce: props.interactiveDebounce,
  offset: [0, props.offset],
  arrow: props.arrow,
  inertia: props.inertia,
})
</script>

<template>
  <div ref="target">
    <slot />
  </div>
</template>

