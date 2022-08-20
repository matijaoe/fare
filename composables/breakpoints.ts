import { breakpointsTailwind, useBreakpoints as useVueUseBreakpoints } from '@vueuse/core'

export const iaBreakpoints = {
  'xs': 375,
  // => @media (min-width: 375px) { ... }

  'sm': 640,
  // => @media (min-width: 640px) { ... }

  'md': 768,
  // => @media (min-width: 768px) { ... }

  'lg': 1024,
  // => @media (min-width: 1024px) { ... }

  'xl': 1280,
  // => @media (min-width: 1280px) { ... }

  '2xl': 1536,
  // => @media (min-width: 1536px) { ... }
}

export const useBreakpoints = () => {
  const breakpoints = useVueUseBreakpoints(breakpointsTailwind)

  // less than, non-including
  const down = {
    smDown: breakpoints.smaller('sm'),
    mdDown: breakpoints.smaller('md'),
    lgDown: breakpoints.smaller('lg'),
    xlDown: breakpoints.smaller('xl'),
    xxlDown: breakpoints.smaller('2xl'),
  }

  // more than, including breakpoint
  const up = {
    smUp: breakpoints.greater('sm'),
    mdUp: breakpoints.greater('md'),
    lgUp: breakpoints.greater('lg'),
    xlUp: breakpoints.greater('xl'),
    xxlUp: breakpoints.greater('2xl'),
  }

  return {
    breakpoints,
    ...down,
    ...up,
  }
}
