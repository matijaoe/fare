import { db } from '~~/lib/db'
import { sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  try {
    return db.moneyAccount.findMany({
      include: {
        CashAccount: true,
        InvestmentAccount: true,
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
