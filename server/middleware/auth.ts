import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const { url } = event.req

  const isAuthRequest = url?.startsWith('/api/auth')

  if (!isAuthRequest) {
    const session = await getServerSession(event)

    if (session?.user) {
      // only work correctly in GET requests, and then it must be handled so that userId is not undefined, which would return everything
      event.context.userId = session.user.id
    }
  }
})

