import { StatusCodes } from 'http-status-codes'
import { prisma } from '~/prisma'
import { sendCustomError, sendInternalError } from '~~/composables/api'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    const user = await prisma.account.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
