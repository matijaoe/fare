import { useContextUserId } from '~~/composables/server'
import { db } from '~~/lib/db'
import type { TransactionMonthlyTotal } from '~~/models/resources/transaction'
import { groupBy } from '~~/utils'

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)

  try {
    const totals: TransactionMonthlyTotal[] = await db.$queryRaw`
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

    return groupBy(totals, 'type')
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
