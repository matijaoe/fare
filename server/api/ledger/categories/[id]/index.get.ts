import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError } from '~~/composables/api'
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
      sendCustomError(event, StatusCodes.NOT_FOUND, 'Category not found')
    }

    return category
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
