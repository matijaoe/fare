import type { Account, Category, Transaction, TransactionType } from '@prisma/client'

export type TransactionWithCategoryAndCashAccount = Transaction &
{ category?: Category } &
{
  fromAccount?: { account: Account }
  toAccount?: { account: Account }
}

export type TransactionMonthlyTotal = {
  date: string
  type: Omit<TransactionType, 'Transfer'>
  currency: string
  total: number
}

export type TransactionMonyhlyTotalObject = Record<TransactionType, TransactionMonthlyTotal[]>
