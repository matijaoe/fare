import type { Prisma } from '@prisma/client'
import { prisma } from '~/prisma'

export default defineEventHandler(async (event) => {
  const { start, end } = useQuery(event) as { start: string; end: string }

  const startDate = start ? new Date(start) : undefined
  const endDate = end ? new Date(end) : undefined

  const paymentAccountArgs: Prisma.TransactionFindManyArgs = {
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: 'desc',
    },
  }

  try {
    return prisma.account.findMany({
      include: {
        CashAccount: {
          include: {
            paymentFromAccount: paymentAccountArgs,
            paymentToAccount: paymentAccountArgs,
          },
        },
        InvestmentAccount: true,
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
