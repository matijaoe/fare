import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readParams, sendCustomError, sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.AccountWhereUniqueInput>(event)

  const data = await readBody<Prisma.AccountUncheckedUpdateManyInput>(event)
  const userId = data?.userId as string | undefined

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const account = await db.moneyAccount.updateMany({
      where: {
        ...where,
        userId,
      },
      data,
    })

    setResStatus(event, StatusCodes.OK)
    return account
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
