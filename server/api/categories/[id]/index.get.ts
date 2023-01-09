import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { getDateRange, readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'Unauthorized')
  }

  const where = readParams<Prisma.CategoryWhereUniqueInput>(event)

  const { prismaRangeQuery: date } = getDateRange(event)

  const { transactions } = getQuery(event) as { transactions?: string }
  const withTransactions = transactions === 'true'

  try {
    const item = await db.category.findFirst({
      where: {
        ...where,
        userId,
      },
      include: {
        // eslint-disable-next-line multiline-ternary
        transactions: withTransactions ? {
          include: {
            category: true,
            fromAccount: { include: { account: true } },
            toAccount: { include: { account: true } },
          },
          orderBy: {
            date: 'desc',
          },
          where: {
            date,
            userId,
          },
        } : false,
      },
    })

    if (!item) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Category not found')
    }

    return item
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
