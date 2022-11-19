import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readUserId, sendInternalError, setResStatus } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const body = await useBody<Prisma.MoneyAccountUncheckedCreateInput>(event)

  const userId = readUserId(event)
  console.log('🦄 POST userId :>> ', userId)

  try {
    const account = await db.cashAccount.create({
      data: {
        account: {
          create: body,
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
