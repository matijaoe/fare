type SessionUser = { image: string; name: string; email: string; id: string }

export const useAuth = async () => {
  const { data } = await useSession({ required: true })

  const user = computed<SessionUser | undefined>(() => data?.value?.user ?? undefined)
  const userId = computed<string | undefined>(() => user.value?.id ?? undefined)

  return {
    user,
    userId,
  }
}
