import type { MoneyAccount, Transaction, TransactionType } from '@prisma/client'
import type { CategoryWithCount } from './category'

export type TransactionWithCategoryAndCashAccount = Transaction &
{ category?: CategoryWithCount } &
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
