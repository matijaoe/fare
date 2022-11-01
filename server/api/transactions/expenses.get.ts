import { sendInternalError, useContextUserId } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler((event) => {
  try {
    return db.transaction.findMany({
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
