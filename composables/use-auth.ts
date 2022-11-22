import type { UseAuthOptions } from '~~/models'

// required is set as false, so it wont automatically redirect to /login page when called
// use only for helpers, and typed data
export const useAuth = async (options: UseAuthOptions = {}) => {
  const { data, status, ...sessionRest } = await useSession({
    required: false,
    ...options,
  })

  const user = computed(() => data?.value?.user)
  const userId = computed(() => user.value?.id)

  const isAuthenticated = computed<boolean>(() => status.value === 'authenticated')
  const isUnauthenticated = computed<boolean>(() => status.value === 'unauthenticated')
  const isLoading = computed<boolean>(() => status.value === 'loading')

  return {
    data,
    user,
    userId,
    status,
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    ...sessionRest,
  }
}
