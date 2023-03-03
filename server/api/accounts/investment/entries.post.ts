import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.InvestmentEntryUncheckedCreateInput>(event)

  try {
    const [_deleted, updated] = await db.$transaction([
      db.investmentEntry.deleteMany({
        where: {
          investmentAccountId: data.investmentAccountId,
          date: { equals: data.date },
        },
      }),
      db.investmentEntry.create({
        data,
      }),
    ])

    setResStatus(event, StatusCodes.CREATED)
    return updated
  } catch (err: unknown) {
    sendInternalError(event, err)
  }
})
