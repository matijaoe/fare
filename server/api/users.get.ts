import { prisma } from '~~/prisma/main'

export default defineEventHandler(() => {
  return prisma.user.findMany()
})
