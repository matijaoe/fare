import { isAfter } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { getDateRange, readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { groupBy } from '~~/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)

  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  const { monthAsDate, monthQuery, isCurrentMonth, monthEnd } = getDateRange(event)

  const today = new Date()

  const snapshotDate = !monthAsDate || isCurrentMonth || isAfter(monthEnd!, today)
    ? today
    : monthEnd!

  try {
    const entries = await db.investmentEntry.findMany({
      where: {
        account: { account: { userId } },
        date: { lte: snapshotDate },
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
      monthQuery,
    }
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
