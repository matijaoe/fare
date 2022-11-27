import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { getDateRange, readParams, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No user id')
  }

  const { prismaRangeQuery: date } = getDateRange(event)

  const where = readParams<Prisma.MoneyAccountWhereUniqueInput>(event)

  const { transactions } = getQuery(event) as { transactions?: string }
  const withTransactions = transactions === 'true'

  const paymentAccountArgs: Prisma.TransactionFindManyArgs = {
    where: {
      // TODO: doesn't do anything yet, it seems
      date,
      userId,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      category: true,
      fromAccount: { include: { account: true } },
      toAccount: { include: { account: true } },
    },
  }

  try {
    const account = await db.cashAccount.findFirst({
      where,
      include: {
        paymentFromAccount: withTransactions ? paymentAccountArgs : false,
        paymentToAccount: withTransactions ? paymentAccountArgs : false,
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
