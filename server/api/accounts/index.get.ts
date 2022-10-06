import type { Prisma } from '@prisma/client'
import { prisma } from '~/prisma'
import { useTransactionDateRange } from '~~/composables/server'

export default defineEventHandler((event) => {
  const { dateQuery: date } = useTransactionDateRange(event)

  const paymentAccountArgs: Prisma.TransactionFindManyArgs = {
    where: {
      date,
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
