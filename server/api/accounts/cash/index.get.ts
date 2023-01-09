import type { Prisma } from '@prisma/client'
import { db } from '~~/lib/db'
import { getDateRange, readUserId, sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  if (!userId) {
    return null
  }

  const { prismaRangeQuery: date, hasDefinedMonth } = getDateRange(event)

  const { transactions } = getQuery(event) as { transactions?: string }
  const withTransactions = (hasDefinedMonth && transactions !== 'false') || transactions === 'true'

  const paymentAccountArgs: Prisma.TransactionFindManyArgs | boolean = withTransactions
    ? {
        where: { date, userId },
        orderBy: { date: 'desc' },
      }
    : false

  try {
    return db.cashAccount.findMany({
      include: {
        paymentFromAccount: paymentAccountArgs,
        paymentToAccount: paymentAccountArgs,
        account: true,
      },
      where: {
        account: {
          userId,
        },
      },
    })
  } catch (err) {
    sendInternalError(event, err)
  }
})
