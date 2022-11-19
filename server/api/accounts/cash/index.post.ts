import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus, useContextUserId } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  console.log('event.context :>> ', event.context)
  console.log('🟧🟧🟧 ACCOUNT 🟧🟧🟧')
  // console.log('event.context :>> ', event.context.userId)
  const userId = useContextUserId(event)
  // console.log('🍎 server userId :>> ', userId)

  const accountCreate = await useBody<Prisma.MoneyAccountUncheckedCreateWithoutUserInput>(event)
  const body = { ...accountCreate, userId }

  if (!userId) {
    console.log('❄️ no user id')
    return
  }

  // console.log('🔴 body :>> ', body)
  // TODO: query is run before anything before it???????
  try {
    console.log('---------------- BEFORE', userId)
    const account = await db.cashAccount.create({
      data: {
        account: {
          create: {
            ...body,
          },
        },
      },
      include: {
        account: true,
      },
    })
    console.log('---------------- AFTER ', userId)
    setResStatus(event, StatusCodes.CREATED)
    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
