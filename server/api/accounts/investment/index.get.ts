import type { Prisma } from '@prisma/client'
import { readUserId, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'

// Get cash accounts, with transactions only from given month range
export default defineEventHandler(async (event) => {
  // TODO: temp disable
  // const userId = readUserId(event)
  // if (!userId) {
  //   return null
  // }

  try {
    return db.investmentAccount.findMany({
      include: {
        account: true,
        entries: true,
      },
      where: {
        account: {
          // userId,
        },
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
