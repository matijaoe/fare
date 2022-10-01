import { StatusCodes } from 'http-status-codes'
import { sendCustomError } from '~~/composables/server'

export default defineEventHandler((event) => {
  // TODO: dummy placeholder
  const userId = 'cl85setxh000677uuhadfpwy9'
  if (!userId) {
    sendCustomError(event, StatusCodes.UNAUTHORIZED, 'Unauthorized access')
  }

  event.context.userId = userId
})
