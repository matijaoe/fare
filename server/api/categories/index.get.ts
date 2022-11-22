import { db } from '~~/lib/db'
import { readUserId } from '~~/server/utils'

export default defineEventHandler((event) => {
  const userId = readUserId(event)

  if (!userId) {
    return db.category.findMany({
      where: {
        userId: null,
      },
      include: {
        _count: true,
      },
    })
  }

  return db.category.findMany({
    where: {
      OR: [
        { userId },
        { userId: null },
      ],
    },
    include: {
      _count: true,
    },
  })
})
