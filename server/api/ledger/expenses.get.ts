import { sendInternalError } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler((event) => {
  try {
    return prisma.ledger.findMany({
      where: {
        type: 'Expense',
      },
      include: {
        category: true,
        fromAccount: true,
        toAccount: true,
        s,
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
