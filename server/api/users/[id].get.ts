import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useParams } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.UserWhereUniqueInput>(event)

  try {
    const user = await prisma.user.findFirst({
      where,
    })

    if (!user) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'User not found')
    }

    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
