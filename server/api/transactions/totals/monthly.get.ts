import { useContextUserId } from '~~/composables/server'
import { db } from '~~/lib/db'
import type { TransactionTotalMonthly, TransactionTotalMonthlyObject } from '~~/models/resources/transaction'
import { groupBy } from '~~/utils'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)

  try {
    const totals = await db.$queryRaw<TransactionTotalMonthly[]>`
      SELECT 
        DATE_FORMAT(t.date, '%Y-%m') as date,
        t.type,
        t.currency,
        sum(t.amount) as total
      FROM 
        Transaction t
      WHERE
        t.userId = ${userId}
      GROUP BY 
        1, 2, 3
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
