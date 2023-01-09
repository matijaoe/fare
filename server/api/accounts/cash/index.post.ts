import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const body = await readBody<Prisma.MoneyAccountUncheckedCreateInput>(event)

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
    sendInternalError(event, err)
  }
})
