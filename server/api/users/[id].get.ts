import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readParams, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  // const userId = readUserId(event)

  // if (!userId) {
  //   return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  // }

  const where = readParams<Prisma.UserWhereUniqueInput>(event)

  try {
    const user = await db.user.findFirst({
      where: {
        ...where,
        // id: userId,
      },
    })

    if (!user) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'User not found')
    }

    return user
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
