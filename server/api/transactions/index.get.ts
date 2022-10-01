import type { Prisma } from '@prisma/client'
import { useContextUserId, useTransactionDateRange } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler((event) => {
  const userId = useContextUserId(event)
  const { dateQuery: date } = useTransactionDateRange(event)

  const accountInclude: Prisma.CashAccountArgs = {
    include: {
      account: true,
    },
  }

  try {
    return prisma.transaction.findMany({
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
