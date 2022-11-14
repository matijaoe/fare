import { useAuth } from '~~/composables/use-auth'

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.name !== 'login') {
    const { isUnauthenticated } = await useAuth()
    if (isUnauthenticated.value) {
      // TODO: it isnt navigating
      // navigateTo('/login')

      const router = useRouter()
      router.push('/login')
    }
  }
})
