import type { Prisma } from '@prisma/client'
import { readUserId, useTransactionDateRange } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler((event) => {
  const userId = readUserId(event)
  const { dateQuery: date } = useTransactionDateRange(event)

  const accountInclude: Prisma.CashAccountArgs = {
    include: {
      account: true,
    },
  }

  try {
    return db.transaction.findMany({
      where: {
        date,
        userId,
      },
      include: {
        category: true,
        fromAccount: accountInclude,
        toAccount: accountInclude,
      },
      orderBy: {
        date: 'desc',
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
