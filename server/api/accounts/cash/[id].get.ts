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
      // TODO: doesn't do anything yet, it seems
      date,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      category: true,
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
    const account = await db.cashAccount.findFirst({
      where,
      include: {
        paymentFromAccount: paymentAccountArgs,
        paymentToAccount: paymentAccountArgs,
        account: true,
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
