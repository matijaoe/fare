import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendCustomError, sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  const data = await readBody<Prisma.AccountUncheckedUpdateManyInput>(event)
  const userId = data?.userId as string | undefined

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const account = await db.moneyAccount.updateMany({
      where: {
        id,
        userId,
      },
      data,
    })

    setResStatus(event, StatusCodes.OK)
    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
