export const useAuth = async (options: UseAuthOptions = {}) => {
  const { data: $data, status: $status, getCsrfToken, getProviders, getSession, signIn, signOut } = await useSession({
    required: true,
    onUnauthenticated: () => {
      // console.log('NON AUTH, GO TO LOGIN')
      // navigateTo({ name: 'login' })
    },
    ...options,
  })

  const data = computed(() => $data.value as SessionData)
  const status = computed(() => $status.value as Status)

  const user = computed(() => data?.value?.user ?? undefined)
  const userId = computed(() => user.value?.id ?? undefined)

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
    getCsrfToken,
    getProviders,
    getSession,
    signIn,
    signOut,
  }
}

type Status = 'authenticated' | 'unauthenticated' | 'loading'
type SessionUser = {
  image: string
  name: string
  email: string
  id: string
}

type SessionData = {
  user: SessionUser
  expires: string
} | null

type UseAuthOptions = {
  required?: boolean
  callbackUrl?: string
  onUnauthenticated?: () => void
}
