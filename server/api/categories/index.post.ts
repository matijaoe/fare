import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus, useContextUserId } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
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
