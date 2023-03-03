import { isAfter } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import type { TransactionType } from '~~/models/enums'
import { db } from '~~/lib/db'
import { getDateRange, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  const { monthAsDate, monthQuery, isCurrentMonth, monthEnd, hasDefinedMonth } = getDateRange(event)

  const today = new Date()

  const snapshotDate = (!monthAsDate || isCurrentMonth || isAfter(monthEnd!, today))
    ? today
    : monthEnd!

  let totals: { type: Omit<TransactionType, 'Transfer'>; total: number }[] = []

  try {
    if (hasDefinedMonth) {
      totals = await db.$queryRaw`
        SELECT 
          t.type,
          SUM(t.amount) as total
        FROM 
          Transaction t
        WHERE
          t.userId = ${userId} 
          AND
          t.date < ${monthEnd}
        GROUP BY 
          1
        HAVING 
          t.type in ('Expense', 'Income')
      `
    } else {
      totals = await db.$queryRaw`
        SELECT 
          t.type,
          SUM(t.amount) as total
        FROM 
          Transaction t
        WHERE
          t.userId = ${userId} 
        GROUP BY 
          1
        HAVING 
          t.type in ('Expense', 'Income')
      `
    }

    const getTotal = (type: TransactionType) => totals.find(t => t.type === type)?.total ?? 0

    const balance = getTotal('Income') - getTotal('Expense')

    return {
      balance,
      snapshotDate,
      monthQuery,
    }
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
