import { StatusCodes } from 'http-status-codes'
import { readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'
import type { TransactionTotalMonthly, TransactionTotalMonthlyObject } from '~~/models/resources'
import { groupBy } from '~~/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const totals = await db.$queryRaw<TransactionTotalMonthly[]>`
      SELECT 
        DATE_FORMAT(t.date, '%Y-%m') as date,
        t.type,
        sum(t.amount) as total
      FROM 
        Transaction t
      WHERE
        t.userId = ${userId}
      GROUP BY 
        1, 2
      HAVING 
        t.type in ('Expense', 'Income')
      ORDER BY 
        t.date desc
    `

    return groupBy(totals, 'type') as TransactionTotalMonthlyObject
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
