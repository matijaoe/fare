import { sendInternalError, useContextUserId } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler((event) => {
  try {
    return prisma.transaction.findMany({
      where: {
        type: 'Expense',
        userId: useContextUserId(event),
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
