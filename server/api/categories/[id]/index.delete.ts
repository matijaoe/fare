import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readParams, sendCustomError, sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const where = readParams<Prisma.CategoryWhereUniqueInput>(event)
  const { userId } = await readBody<{ userId: string }>(event)

  if (!userId) {
    return null
  }

  try {
    const res = await db.category.deleteMany({
      where: {
        ...where,
        userId,
      },
    })
    if (!res.count) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Transaction not found')
    }

    setResStatus(event, StatusCodes.OK)

    return res
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
