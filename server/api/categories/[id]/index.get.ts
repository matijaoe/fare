import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, useContextUserId, useParams } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const where = useParams<Prisma.CategoryWhereUniqueInput>(event)

  try {
    const item = await prisma.category.findFirst({
      where,
      include: {
        transactions: {
          where: {
            userId: useContextUserId(event),
          },
        },
      },
    })

    if (!item) {
      return sendCustomError(event, StatusCodes.NOT_FOUND, 'Category not found')
    }

    return item
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
