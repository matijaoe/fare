import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useContextUserId, useParams } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.TransactionWhereUniqueInput>(event)
  try {
    const item = await prisma.transaction.findFirst({
      where: {
        ...where,
        userId: useContextUserId(event),
      },
      include: {
        category: true,
        fromAccount: { include: { account: true } },
        toAccount: { include: { account: true } },
      },
    })

    if (!item) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Transaction not found')
    }

    return item
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
