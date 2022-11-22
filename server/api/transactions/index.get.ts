import type { Prisma } from '@prisma/client'
import { db } from '~~/lib/db'
import { readUserId, sendInternalError, useTransactionDateRange } from '~~/server/utils'

export default defineEventHandler((event) => {
  const userId = readUserId(event)
  const { dateQuery: date } = useTransactionDateRange(event)

  if (!userId) {
    return null
  }

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
