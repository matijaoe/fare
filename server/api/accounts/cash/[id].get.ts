import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readParams, readUserId, sendCustomError, sendInternalError, useTransactionDateRange } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No user id')
  }

  const where = readParams<Prisma.MoneyAccountWhereUniqueInput>(event)
  const { dateQuery: date } = useTransactionDateRange(event)

  const paymentAccountArgs: Prisma.TransactionFindManyArgs = {
    where: {
      date,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      fromAccount: {
        include: {
          account: true,
        },
      },
      toAccount: {
        include: {
          account: true,
        },
      },
    },
  }

  try {
    const user = await db.cashAccount.findFirst({
      where,
      include: {
        paymentFromAccount: paymentAccountArgs,
        paymentToAccount: paymentAccountArgs,
        account: true,
      },
    })

    if (!user) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
