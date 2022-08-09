import { prisma } from '~~/prisma/main'

export default defineEventHandler(async (event) => {
  const data = await useBody(event)
  return await prisma.user.create({
    data,
  })
})
