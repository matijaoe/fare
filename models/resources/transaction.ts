import type { Account, Category, Transaction, TransactionType } from '@prisma/client'

export type TransactionWithCategoryAndCashAccount = Transaction &
{ category?: Category } &
{
  fromAccount?: { account: Account }
  toAccount?: { account: Account }
}

export type TransactionTotalMonthly = {
  date: string
  type: Omit<TransactionType, 'Transfer'>
  currency: string
  total: number
}

export type TransactionTotalMonthlyObject = Record<TransactionType, TransactionTotalMonthly[]>

export type TransactionsTotalsPerRange = {
  from: Date | null
  to: Date | null
  income: number
  expense: number
  net: number
}
