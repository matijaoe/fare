import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useContextUserId, useParams } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.TransactionWhereUniqueInput>(event)
  try {
    const res = await prisma.transaction.deleteMany({
      where: {
        ...where,
        userId: useContextUserId(event),
      },
    })

    if (!res.count) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Transaction not found')
    }

    return res
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
