import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readParams, sendCustomError, sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.MoneyAccountWhereUniqueInput>(event)

  const { userId } = await readBody<{ userId: string }>(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const res = await db.moneyAccount.deleteMany({
      where: {
        ...where,
        userId,
      },
    })

    if (!res.count) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    setResStatus(event, StatusCodes.OK)

    return res
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
