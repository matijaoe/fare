import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  try {
    const data = await useBody(event) as Prisma.AccountCreateInput
    const account = await prisma.cashAccount.create({
      data: {
        account: {
          create: data,
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
