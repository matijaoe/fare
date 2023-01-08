import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readParams, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.MoneyAccountWhereUniqueInput>(event)

  try {
    const user = await db.moneyAccount.findFirst({
      where,
    })

    if (!user) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return user
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
