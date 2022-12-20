// required is set as false, so it wont automatically redirect to /login page when called
// use only for helpers, and typed data
export const useAuth = () => {
  const { data, status, ...sessionRest } = useSession()

  const user = computed(() => data?.value?.user)
  const userId = computed(() => user.value?.id as string | undefined)

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
