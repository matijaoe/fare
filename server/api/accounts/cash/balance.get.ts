import type { Prisma } from '@prisma/client'
import { sendInternalError, useContextUserId } from '~~/composables/server'
import { prisma } from '~~/prisma'

type GroupedTotal = Prisma.PickArray<Prisma.TransactionGroupByOutputType, 'type'[]> & {
  _sum: { amount: number | null }
}

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)

  try {
    const groupedTotals = await prisma.transaction.groupBy({
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

    return { balance }
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
