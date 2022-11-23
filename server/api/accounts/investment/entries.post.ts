import type { Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { db } from '~~/lib/db'
import { sendInternalError, setResStatus } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const data = await readBody<Prisma.InvestmentEntryUncheckedCreateInput>(event)

  try {
    const entry = await db.investmentEntry.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return entry
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})
