import type { MoneyAccount, Category, Transaction, TransactionType } from '@prisma/client'

export type TransactionWithCategoryAndCashAccount = Transaction &
{ category?: Category } &
{
  fromAccount?: { account: MoneyAccount }
  toAccount?: { account: MoneyAccount }
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
