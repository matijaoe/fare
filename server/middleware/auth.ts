import { StatusCodes } from 'http-status-codes'
import { sendCustomError } from '../utils'
import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const { url } = event.req

  const isAuthRequest = url?.startsWith('/api/auth')

  if (!isAuthRequest) {
    const session = await getServerSession(event)

    if (session?.user) {
      event.context.userId = session.user.id
    } else {
      sendCustomError(event, StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }
  }
})

