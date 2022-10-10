import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { prisma } from '~/prisma'
import { sendCustomError, sendInternalError, useParams, useTransactionDateRange } from '~~/composables/server'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.AccountWhereUniqueInput>(event)
  const { dateQuery: date } = useTransactionDateRange(event)

  const paymentAccountArgs: Prisma.TransactionFindManyArgs = {
    where: {
      date,
    },
    orderBy: {
      date: 'desc',
    },
    include: {
      fromAccount: {
        include: {
          account: true,
        },
      },
      toAccount: {
        include: {
          account: true,
        },
      },
    },
  }

  try {
    const user = await prisma.cashAccount.findFirst({
      where,
      include: {
        paymentFromAccount: paymentAccountArgs,
        paymentToAccount: paymentAccountArgs,
        account: true,
      },
    })

    if (!user) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
