import { StatusCodes } from 'http-status-codes'
import type { TransactionType } from '~~/models/enums'
import { db } from '~~/lib/db'
import type { TransactionsTotalsPerRange } from '~~/models/resources'
import { getDateRange, readUserId, sendCustomError } from '~~/server/utils'

type TotalsForMonth = {
  type: TransactionType
  total: number
}

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  const { hasDefinedMonth, monthAsDate, monthStart, monthEnd } = getDateRange(event)

  let sqlRes: TotalsForMonth[] = []

  if (hasDefinedMonth) {
    sqlRes = await db.$queryRaw`
      SELECT
        t.type, 
        sum(amount) as total
      FROM
        Transaction t
      WHERE
        MONTH(t.date) = MONTH(${monthAsDate})
        and
        t.userId = ${userId}
      GROUP BY
        1
    `
  } else {
    sqlRes = await db.$queryRaw`
      SELECT
        t.type, 
        sum(amount) as total
      FROM
        Transaction t
      WHERE
        t.userId = ${userId}
      GROUP BY
        1
    `
  }

  const findTotals = (type: TransactionType) => sqlRes.find(r => r.type === type)

  const income = findTotals('Income')?.total ?? 0
  const expense = findTotals('Expense')?.total ?? 0
  const net = income - expense

  return {
    from: monthStart,
    to: monthEnd,
    income,
    expense,
    net,
  } as TransactionsTotalsPerRange
})
