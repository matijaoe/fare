import type { RouteParamsRaw } from 'vue-router'

// TODO: https://github.com/nuxt/framework/discussions/5070
export type NavItemModel = {
  label: string
  icon: string
  route: RouteParamsRaw
  children?: NavItemModel[]
}
