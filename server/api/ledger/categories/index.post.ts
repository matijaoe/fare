import { StatusCodes } from 'http-status-codes'
import { sendInternalError, setResStatus } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  try {
    const data = await useBody(event)
    const category = await prisma.ledgerCategory.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return category
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
