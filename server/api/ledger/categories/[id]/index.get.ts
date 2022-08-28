import { StatusCodes } from 'http-status-codes'
import { useErrorRes, useRes } from '~~/composables/api'
import { prisma } from '~~/prisma'

export default defineEventHandler(async (event) => {
  const { id } = event.context.params

  try {
    const category = await prisma.ledgerCategory.findFirst({
      where: {
        id,
      },
      include: {
        ledger: true,
      },
    })

    if (!category) {
      return useRes(event, StatusCodes.NOT_FOUND, 'Category not found')
    }

    return category
  } catch (err: any) {
    console.error(err)
    return useErrorRes(event, err)
  }
})
