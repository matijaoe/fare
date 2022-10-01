import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const data = await useBody<Prisma.CategoryUncheckedCreateInput>(event)

  try {
    const item = await prisma.category.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return item
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
