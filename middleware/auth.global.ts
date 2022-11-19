export default defineNuxtRouteMiddleware(async (to, from) => {
  const safeRoutes = ['/login']

  const isProtected = !safeRoutes.includes(to.path)

  console.log('🟧 to', to.path, ' | protected:', isProtected)

  if (!isProtected) {
    console.log('protected page')
    return
  }

  console.info('in global middleware! protecting secrets')
  await useSession({ callbackUrl: to.path })
})
