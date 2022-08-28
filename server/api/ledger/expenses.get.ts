import { LedgerEntryType } from '@prisma/client'
import { prisma } from '~~/prisma'

export default defineEventHandler(() => {
  return prisma.ledger.findMany({
    where: {
      type: LedgerEntryType.Expense,
    },
  })
})
