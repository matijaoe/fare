export default defineNuxtRouteMiddleware(async (to) => {
  const safeRoutes = ['/login']

  const isNonAuthRoute = safeRoutes.includes(to.path)

  // Always allow access
  if (isNonAuthRoute) {
    return
  }

  // If not authenticated, redirect to login ({ required: true} by default), else navigate to path (callbackUrl)
  await useSession({ callbackUrl: to.path })
})
