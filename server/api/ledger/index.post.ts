import type { LedgerEntryType, Prisma } from '@prisma/client'
import { StatusCodes } from 'http-status-codes'
import { sendCustomError, sendInternalError, setResStatus } from '~~/composables/api'
import { prisma } from '~~/prisma'

type TypeRuleset = Record<LedgerEntryType, {
  fromAccountId: boolean
  toAccountId: boolean
}>

const typeRuleset: TypeRuleset = {
  Expense: {
    fromAccountId: true,
    toAccountId: false,
  },
  Income: {
    fromAccountId: false,
    toAccountId: true,
  },
  Transfer: {
    fromAccountId: true,
    toAccountId: true,
  },
}

const validEntryType = (entry: Prisma.LedgerUncheckedCreateInput) => {
  const typeRule = typeRuleset[entry.type]

  const validFrom = typeRule.fromAccountId === !!entry.fromAccountId
  const validTo = typeRule.toAccountId === !!entry.toAccountId

  return validFrom && validTo
}

export default defineEventHandler(async (event) => {
  try {
    const data = await useBody(event) as Prisma.LedgerUncheckedCreateInput

    if (!validEntryType(data)) {
      sendCustomError(event, StatusCodes.BAD_REQUEST, 'Invalid entry type logic')
    }

    const entry = await prisma.ledger.create({
      data,
    })

    setResStatus(event, StatusCodes.CREATED)
    return entry
  } catch (err: unknown) {
    console.error(err)
    sendInternalError(event, err)
  }
})

