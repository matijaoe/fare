import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, setResStatus, useContextUserId } from '~~/composables/server'
import { prisma } from '~~/prisma'
import { validEntryType } from '~~/utils/server/transaction'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  const data = await useBody<Prisma.TransactionUncheckedCreateInput>(event)

  if (!validEntryType(data)) {
    sendCustomError(event, StatusCodes.BAD_REQUEST, 'Invalid entry type logic')
  }

  try {
    const entry = await prisma.transaction.create({
      data: {
        ...data,
        userId,
      },
    })

    setResStatus(event, StatusCodes.CREATED)
    return entry
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})

