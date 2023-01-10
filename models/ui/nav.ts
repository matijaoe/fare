import type { RouteParamsRaw } from 'vue-router'

export type NavItemModel = {
  label: string
  icon: string
  route: RouteParamsRaw
  children?: NavItemModel[]
}
