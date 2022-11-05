import MobileDetect from 'mobile-detect'

// https://github.com/nuxt-community/device-module/blob/master/lib/plugin.js
export default defineNuxtPlugin(() => {
  const ua = 'user-agent'
  const { [ua]: userAgentHeader } = useRequestHeaders([ua])

  if (!userAgentHeader) {
    return
  }

  const md = new MobileDetect(userAgentHeader)
  const isMobile = md.phone() !== null || md.mobile() === 'UnknownMobile'
  const isTablet = md.tablet() !== null || md.mobile() === 'UnknownTablet'
  const isDesktop = !isMobile && !isTablet

  const deviceStore = useDeviceStore()
  deviceStore.setDevice({ isMobile, isTablet, isDesktop })
})
