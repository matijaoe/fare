import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus, useContextUserId } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  // console.log('🧽🧽🧽🧽🧽🧽🧽🧽🧽')
  // console.log('event.context :>> ', event.context)
  // const userId = useContextUserId(event)
  // console.log('🍎 server userId :>> ', userId)

  const accountCreate = await useBody<Prisma.MoneyAccountUncheckedCreateInput>(event)

  try {
    const account = await db.cashAccount.create({
      data: {
        account: {
          create: {
            ...accountCreate,
            // userId,
          },
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
