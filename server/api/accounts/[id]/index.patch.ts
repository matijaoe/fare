import { prisma } from '~/prisma'
import { useErrorRes } from '~~/composables/api'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  const data = await useBody<{ name: string }>(event)

  try {
    const account = await prisma.account.update({
      where: {
        id,
      },
      data,
    })

    return account
  } catch (err: any) {
    console.error(err)
    return useErrorRes(event, err)
  }
})
