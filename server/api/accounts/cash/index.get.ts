import type { Prisma } from '@prisma/client'
import { sendInternalError, useContextUserId, useTransactionDateRange } from '~~/server/utils'
import { db } from '~~/lib/db'

// Get cash accounts, with transactions only from given month range
export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  console.log('🙁 GET ACC, userId :>> ', userId)

  const { dateQuery: date, withTransactions } = useTransactionDateRange(event)

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
    console.error(err)
    sendInternalError(event, err)
  }
})
