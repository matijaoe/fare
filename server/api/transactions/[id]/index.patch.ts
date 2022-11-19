import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.TransactionWhereUniqueInput>(event)
  const userId = readUserId(event)

  const body = await useBody<Prisma.TransactionUncheckedUpdateWithoutUserInput>(event)

  const data = { ...body }
  if (data.type === 'Income') {
    data.fromAccountId = null
  } else if (data.type === 'Expense') {
    data.toAccountId = null
  }

  try {
    const res = await db.transaction.updateMany({
      where: {
        ...where,
        userId,
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
