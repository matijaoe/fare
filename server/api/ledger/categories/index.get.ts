import { prisma } from '~~/prisma'

export default defineEventHandler(() => {
  return prisma.ledgerCategory.findMany()
})
