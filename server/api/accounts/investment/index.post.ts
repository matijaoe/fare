import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { account: accountData, ...investmentData } = await readBody<{ account: Prisma.MoneyAccountUncheckedCreateInput } & Prisma.InvestmentAccountCreateInput>(event)

  try {
    const account = await db.investmentAccount.create({
      data: {
        ...investmentData,
        account: {
          create: accountData,
        },
      },
      include: {
        account: true,
      },
    })

    setResStatus(event, StatusCodes.CREATED)
    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
