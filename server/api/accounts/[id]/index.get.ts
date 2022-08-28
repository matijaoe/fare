import { StatusCodes } from 'http-status-codes'
import { prisma } from '~/prisma'
import { useErrorRes, useRes } from '~~/composables/api'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    const user = await prisma.account.findFirst({
      where: {
        id,
      },
    })

    if (!user) {
      return useRes(event, StatusCodes.NOT_FOUND, 'Account not found')
    }

    return user
  } catch (err: any) {
    console.error(err)
    return useErrorRes(event, err)
  }
})
