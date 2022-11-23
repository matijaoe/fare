import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

type GroupedTotal = Prisma.PickArray<Prisma.TransactionGroupByOutputType, 'type'[]> & {
  _sum: { amount: number | null }
}

// TODO: DO NOT USE, this is all just copy pasted from the cash accounts
export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const groupedTotals = await db.transaction.groupBy({
      by: ['type'],
      _sum: { amount: true },
      where: {
        type: { in: ['Expense', 'Income'] },
        userId,
      },
    })

    const balance = groupedTotals.reduce((total: number, curr: GroupedTotal) => {
      switch (curr.type) {
        case 'Expense':
          total -= curr._sum.amount ?? 0
          break
        case 'Income':
          total += curr._sum.amount ?? 0
          break
      }
      return total
    }, 0)

    return { balance, timestamp: new Date() }
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
