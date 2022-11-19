import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.TransactionWhereUniqueInput>(event)
  try {
    const item = await db.transaction.findFirst({
      where: {
        ...where,
        userId: readUserId(event),
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
