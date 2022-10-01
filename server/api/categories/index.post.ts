import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus, useContextUserId } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  const body = await useBody<Prisma.CategoryUncheckedCreateInput>(event)

  try {
    const item = await prisma.category.create({
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
