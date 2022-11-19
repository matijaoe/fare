import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const body = await useBody<Prisma.MoneyAccountUncheckedCreateInput>(event)

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
