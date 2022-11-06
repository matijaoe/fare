import type { TransactionType } from '@prisma/client'
import { useContextUserId, useTransactionDateRange } from '~~/composables/server'
import { db } from '~~/lib/db'
import type { TransactionsTotalsPerRange } from '~~/models/resources/transaction'

type TotalsForMonth = {
  type: TransactionType
  currency: string
  total: number
}

export default defineEventHandler(async (event) => {
  const userId = useContextUserId(event)
  const { startDate, endDate, hasDefinedRange } = useTransactionDateRange(event)

  let sqlRes: TotalsForMonth[] = []

  if (hasDefinedRange) {
    sqlRes = await db.$queryRaw`
      SELECT
        t.type, 
        t.currency,
        sum(amount) as total
      FROM
        Transaction t
      WHERE
        t.date BETWEEN ${startDate} AND ${endDate}
        and
        t.userId = ${userId}
      GROUP BY
        1, 2
    `
  } else {
    sqlRes = await db.$queryRaw`
      SELECT
        t.type, 
        t.currency,
        sum(amount) as total
      FROM
        Transaction t
      WHERE
        t.userId = ${userId}
      GROUP BY
        1, 2
    `
  }

  const findTotals = (type: TransactionType) => sqlRes.find(r => r.type === type)

  const income = findTotals('Income')?.total ?? 0
  const expense = findTotals('Expense')?.total ?? 0
  const net = income - expense

  return {
    from: hasDefinedRange ? startDate : null,
    to: hasDefinedRange ? endDate : null,
    income,
    expense,
    net,
  } as TransactionsTotalsPerRange
})
