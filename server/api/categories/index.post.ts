import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { readUserId, sendInternalError, setResStatus } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  const body = await useBody<Prisma.CategoryUncheckedCreateInput>(event)

  try {
    const item = await db.category.create({
      data: {
        ...body,
        userId,
      },
    })

    setResStatus(event, StatusCodes.CREATED)
    return item
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
