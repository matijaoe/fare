import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.CategoryUncheckedCreateInput>(event)

  try {
    const item = await db.category.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return item
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
