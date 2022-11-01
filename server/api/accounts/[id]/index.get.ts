import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useParams } from '~~/composables/server'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.AccountWhereUniqueInput>(event)

  try {
    const user = await db.account.findFirst({
      where,
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
