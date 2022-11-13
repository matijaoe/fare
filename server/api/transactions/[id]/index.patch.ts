import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useContextUserId, useParams } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.TransactionWhereUniqueInput>(event)
  const userId = useContextUserId(event)

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
