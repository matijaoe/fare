import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useContextUserId, useParams } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.TransactionWhereUniqueInput>(event)
  const userId = useContextUserId(event)
  const data = await useBody<Prisma.TransactionUncheckedCreateInput>(event)

  try {
    const res = await prisma.transaction.updateMany({
      where: {
        ...where,
        userId: useContextUserId(event),
      },
      data: {
        ...data,
        userId,
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
