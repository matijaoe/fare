import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'
import type { RouteLocationRaw } from 'vue-router'

export type BreadcrumbModel = {
  label: string
  href: RouteLocationRaw
}

export const useBreadcrumbs = defineStore('breadcrumbs', () => {
  const crumbs = ref<BreadcrumbModel[]>([])

  const setCrumbs = (value: BreadcrumbModel[]) => {
    set(crumbs, value)
  }

  const resetCrumbs = () => set(crumbs, [])

  const isPreviousCrumb = (i: number) => i < crumbs.value.length - 1
  const isLastCrumb = (i: number) => i === crumbs.value.length - 1

  return {
    crumbs,
    setCrumbs,
    resetCrumbs,
    isPreviousCrumb,
    isLastCrumb,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBreadcrumbs, import.meta.hot))
}
