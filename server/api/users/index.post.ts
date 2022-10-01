import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/composables/server'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  try {
    const data = await useBody<Prisma.UserCreateInput>(event)
    const user = await prisma.user.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return user
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})

