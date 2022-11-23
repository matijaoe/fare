import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readUserId, sendCustomError, sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    return db.investmentAccount.findMany({
      include: {
        account: true,
      },
      where: {
        account: {
          userId,
        },
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
