import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import type { InvestmentAccountUpdateReq } from '~~/models/resources'
import { readParams, sendCustomError, sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { id: investmentAccountId } = readParams<Prisma.InvestmentAccountWhereUniqueInput>(event)

  const { account: accountData, ...investmentData } = await readBody<InvestmentAccountUpdateReq>(event)

  const userId = accountData?.userId as string | undefined

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const [investmentAccount, account] = await db.$transaction([
      db.investmentAccount.updateMany({
        where: {
          id: investmentAccountId,
          account: {
            userId,
          },
        },
        data: investmentData,
      }),
      db.moneyAccount.updateMany({
        where: {
          InvestmentAccount: {
            id: investmentAccountId,
          },
          userId,
        },
        data: accountData,
      }),
    ])

    setResStatus(event, StatusCodes.CREATED)
    return { investmentAccount, account }
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
