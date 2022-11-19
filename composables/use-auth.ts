import type { DefaultSession, Status, UseAuthOptions } from '~~/models'

// required is set as false, so it wont automatically redirect to /login page when called
// use only for helpers, and typed data
// TODO: why type: any in my useSession, should be typed by default
export const useAuth = async (options: UseAuthOptions = {}) => {
  const { data: $data, status: $status, ...rest } = await useSession({
    required: false,
    ...options,
  })

  const data = computed(() => $data.value as DefaultSession)
  const status = computed(() => $status.value as Status)

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
    // states
    isAuthenticated,
    isUnauthenticated,
    isLoading,
    ...rest,
  }
}
