import type { Prisma, TransactionType } from '@prisma/client'

type TypeRuleset = Record<TransactionType, {
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

export const validEntryType = (entry: Prisma.TransactionUncheckedCreateInput) => {
  const typeRule = typeRuleset[entry.type]

  const validFrom = typeRule.fromAccountId === !!entry.fromAccountId
  const validTo = typeRule.toAccountId === !!entry.toAccountId

  return validFrom && validTo
}
