import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  try {
    const data = await useBody(event)
    const entry = await prisma.ledger.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return entry
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})

