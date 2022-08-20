import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  const user = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  })

  if (!user)
    throw new Error('User not found')

  return user
})
