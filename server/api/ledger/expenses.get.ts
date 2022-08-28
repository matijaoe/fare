import { sendInternalError } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler((event) => {
  try {
    return prisma.account.findMany()
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
