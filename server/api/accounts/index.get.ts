import { prisma } from '~/prisma'
import { sendInternalError } from '~~/composables/api'

export default defineEventHandler((event) => {
  try {
    return prisma.account.findMany()
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
