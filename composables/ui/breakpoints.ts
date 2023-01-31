import { breakpointsTailwind, useBreakpoints as useVueUseBreakpoints } from '@vueuse/core'

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
