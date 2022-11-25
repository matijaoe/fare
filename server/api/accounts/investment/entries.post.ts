import type { Prisma } from '@prisma/client'
import { addMonths, startOfMonth } from 'date-fns'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.InvestmentEntryUncheckedCreateInput>(event)

  const date = new Date(data.date)
  const gte = startOfMonth(date)
  const lte = startOfMonth(addMonths(date, 1))

  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_deleted, updated] = await db.$transaction([
      db.investmentEntry.deleteMany({
        where: {
          investmentAccountId: data.investmentAccountId,
          date: { gte, lte },
        },
      }),
      db.investmentEntry.create({
        data,
      }),
    ])

    setResStatus(event, StatusCodes.CREATED)
    return updated
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
