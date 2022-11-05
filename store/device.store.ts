import { acceptHMRUpdate, defineStore } from 'pinia'
import { set } from '@vueuse/core'

export const useDeviceStore = defineStore('device', () => {
  const isMobile = ref<boolean>()
  const isTablet = ref<boolean>()
  const isDesktop = ref<boolean>()

  const isMobileOrTablet = computed(() => isMobile.value || isTablet.value)
  const isDesktopOrTablet = computed(() => isDesktop.value || isTablet.value)

  const setIsMobile = (value: boolean) => set(isMobile, value)
  const setIsTablet = (value: boolean) => set(isTablet, value)
  const setIsDesktop = (value: boolean) => set(isDesktop, value)

  const setDevice = (bools: { isMobile: boolean; isTablet: boolean; isDesktop: boolean }) => {
    setIsMobile(bools.isMobile)
    setIsTablet(bools.isTablet)
    setIsDesktop(bools.isDesktop)
  }

  return {
    isMobile,
    isTablet,
    isDesktop,
    isMobileOrTablet,
    isDesktopOrTablet,
    setIsMobile,
    setIsTablet,
    setIsDesktop,
    setDevice,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useDeviceStore, import.meta.hot))
}
