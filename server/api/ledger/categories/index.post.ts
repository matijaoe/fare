import { StatusCodes } from 'http-status-codes'
import { setResStatus } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const data = await useBody(event)
  const user = await prisma.ledgerCategory.create({
    data,
  })

  setResStatus(event, StatusCodes.CREATED)
  return user
})
