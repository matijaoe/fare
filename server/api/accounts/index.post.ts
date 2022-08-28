import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  try {
    const data = await useBody(event)
    const account = await prisma.account.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return account
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
