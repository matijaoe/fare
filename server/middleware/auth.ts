import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  // const { url } = event.req

  // const isAuthRequest = url?.startsWith('/api/auth')

  // if (!isAuthRequest) {
  //   const session = await getServerSession(event)
  //   if (session?.user) {
  //     console.log('🔵🔵🔵 MIDDLEWARE 🔵🔵🔵', session.user.id)
  //     event.context.userId = session.user.id
  //     event.context.user = session.user
  //   }
  // }
})

