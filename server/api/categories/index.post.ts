import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.CategoryUncheckedCreateInput>(event)

  try {
    const item = await db.category.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return item
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
