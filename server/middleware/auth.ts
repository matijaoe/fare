import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const { url } = event.req

  const isAuthRequest = url?.startsWith('/api/auth')

  console.log('🔵🔵🔵 MIDDLEWARE 🔵🔵🔵')

  if (!isAuthRequest) {
    const session = await getServerSession(event)
    if (session?.user?.id) {
      event.context.userId = session.user.id
    }
  }
})

