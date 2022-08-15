import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  try {
    const { id } = event.context.params

    const user = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    })

    if (!user)
      throw new Error('User not found')

    return user
  }
  catch (err) {
    console.log(err)
  }
})
