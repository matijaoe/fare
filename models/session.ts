export type Status = 'authenticated' | 'unauthenticated' | 'loading'

export type SessionUser = {
  image: string
  name: string
  email: string
  id: string
}

export type DefaultSession = {
  user?: SessionUser
  expires: string
} | null | undefined

export type UseAuthOptions = {
  required?: boolean
  callbackUrl?: string
  onUnauthenticated?: () => void
}
