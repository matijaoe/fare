import type { BreadcrumbModel } from '~~/store/breadcrumbs.store'

export const setBreadcrumbs = (crumbs: BreadcrumbModel[]) => {
  const store = useBreadcrumbs()

  store.setCrumbs(crumbs)
}
