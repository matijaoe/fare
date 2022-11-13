import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  console.log('🔵', event.req.url)
})

