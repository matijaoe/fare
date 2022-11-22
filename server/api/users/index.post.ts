import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/server/utils'
import { db } from '~~/lib/db'

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody<Prisma.UserCreateInput>(event)
    const user = await db.user.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})

