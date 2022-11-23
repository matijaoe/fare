import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.CategoryWhereUniqueInput>(event)

  // TODO: pass date for transactions month range
  // const { dateQuery: date } = useTransactionDateRange(event)

  const userId = readUserId(event)
  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'Unauthorized')
  }

  const accountInclude: Prisma.CashAccountArgs = {
    include: {
      account: true,
    },
  }

  try {
    const item = await db.category.findFirst({
      where,
      include: {
        transactions: {
          include: {
            category: true,
            fromAccount: accountInclude,
            toAccount: accountInclude,
          },
          orderBy: {
            date: 'desc',
          },
          where: {
            // date,
            userId,
          },
        },
      },
    })

    if (!item) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Category not found')
    }

    return item
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
