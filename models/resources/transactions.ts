import type { Account, Category, Transaction } from '@prisma/client'

export type TransactionWithCategoryAndCashAccount = Transaction &
{ category?: Category } &
{
  fromAccount?: { account: Account }
  toAccount?: { account: Account }
}
