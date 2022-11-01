import { useContextUserId } from '~~/composables/server'
import { db } from '~~/lib/db'

export default defineEventHandler((event) => {
  return db.category.findMany({
    where: {
      OR: [
        { userId: useContextUserId(event) },
        { userId: null },
      ],
    },
  })
})
