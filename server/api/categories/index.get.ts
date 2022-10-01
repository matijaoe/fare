import { prisma } from '~~/prisma'
import { useContextUserId } from '~~/composables/server'

export default defineEventHandler((event) => {
  return prisma.category.findMany({
    where: {
      OR: [
        { userId: useContextUserId(event) },
        { userId: null },
      ],
    },
  })
})
