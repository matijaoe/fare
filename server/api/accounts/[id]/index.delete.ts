import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useContextUserId, useParams } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.MoneyAccountWhereUniqueInput>(event)

  const userId = await useContextUserId(event)

  try {
    const res = await db.moneyAccount.deleteMany({
      where: {
        ...where,
        userId,
      },
    })

    if (!res.count) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return res
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
