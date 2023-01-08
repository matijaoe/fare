import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  const where = readParams<Prisma.UserWhereUniqueInput>(event)
  const data = await readBody<Prisma.UserUncheckedUpdateInput>(event)

  try {
    const user = await db.user.update({
      where: {
        ...where,
        id: userId,
      },
      data,
    })

    if (!user) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'User not found')
    }

    return user
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
