import { endOfMonth, isBefore, isDate, isThisMonth } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { groupBy } from '~~/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  const today = new Date()

  // TODO: extract into useTransactionDateRange, completely refactor it
  const { month } = getQuery(event) as { month?: string }

  // start of month, or todays date
  const monthAsDate = month
    ? isDate(new Date(month))
      ? new Date(month)
      : today
    : today

  const snapshotDate = !isThisMonth(monthAsDate) && isBefore(monthAsDate, today)
    ? endOfMonth(monthAsDate)
    : today

  try {
    const entries = await db.investmentEntry.findMany({
      where: {
        account: { account: { userId } },
        date: snapshotDate
          ? { lte: snapshotDate }
          : undefined,
      },
      orderBy: {
        date: 'desc',
      },
    })

    const groupedByAccount = groupBy(entries, 'investmentAccountId')
    const balance = Object.values(groupedByAccount)
      .map(entries => entries.sort((a, b) => b.date.getTime() - a.date.getTime()).at(0))
      .reduce((total, curr) => total + (curr?.balance ?? 0), 0)

    return {
      balance,
      snapshotDate,
      monthQuery: month,
    }
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
