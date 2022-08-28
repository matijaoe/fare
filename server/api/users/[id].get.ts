import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      sendCustomError(event, StatusCodes.NOT_FOUND, 'User not found')
    }

    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
