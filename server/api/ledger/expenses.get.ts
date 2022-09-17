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
        fromAccount: {
          include: {
            account: {
              select: {
                name: true,
                color: true,
                icon: true,
              },
            },
          },
        },
        toAccount: {
          include: {
            account: {
              select: {
                name: true,
                color: true,
                icon: true,
              },
            },
          },
        },
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
