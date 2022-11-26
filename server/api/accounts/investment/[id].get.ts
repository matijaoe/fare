import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No user id')
  }

  const where = readParams<Prisma.InvestmentAccountWhereUniqueInput>(event)

  try {
    const account = await db.investmentAccount.findFirst({
      where: {
        ...where,
        account: {
          userId,
        },
      },
    })

    if (!account) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
