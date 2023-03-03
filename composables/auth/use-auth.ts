// use only for helpers, and typed data
export const useAuth = () => {
  const { data, status, ...sessionRest } = useSession()

  const user = computed(() => data?.value?.user)
  const userId = computed(() => user.value?.id as string | undefined)

  const isAuthenticated = computed(() => status.value === 'authenticated')
  const isUnauthenticated = computed(() => status.value === 'unauthenticated')
  const isLoading = computed(() => status.value === 'loading')

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
