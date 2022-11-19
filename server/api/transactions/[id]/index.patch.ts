import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readParams, sendCustomError, sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.TransactionWhereUniqueInput>(event)

  const body = await readBody<Prisma.TransactionUncheckedUpdateInput>(event)
  const userId = body?.userId as string | undefined

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
      data,
    })

    if (!res.count) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Transaction not found')
    }

    setResStatus(event, StatusCodes.OK)

    return res
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
