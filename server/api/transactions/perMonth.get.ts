import type { Prisma } from '@prisma/client'
import { useContextUserId, useTransactionDateRange } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)

  try {
    // TODO: sql query to group by month and year
    const totals = await db.transaction.groupBy({
      by: ['date', 'type'],
      _sum: {
        amount: true,
      },
      where: {
        userId,
        type: {
          in: ['Expense'],
        },
      },
    })

    return totals
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
