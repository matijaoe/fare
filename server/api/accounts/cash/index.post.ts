import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus, useContextUserId } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  const accountCreate = await useBody<Prisma.AccountUncheckedCreateWithoutUserInput>(event)

  try {
    const account = await prisma.cashAccount.create({
      data: {
        account: {
          create: {
            ...accountCreate,
            userId,
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
