import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const { url } = event.req

  const isAuthRequest = url?.startsWith('/api/auth')

  if (!isAuthRequest) {
    const session = await getServerSession(event)
    console.log('🔵🔵🔵 MIDDLEWARE 🔵🔵🔵', session)
    if (session?.user) {
      event.context.userId = session.user.id
      event.context.user = session.user
      console.log('event.context :>> ', event.context)
    }
  }
})

