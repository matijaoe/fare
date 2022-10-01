import type { Account, CashAccount, Prisma, Transaction } from '@prisma/client'

export type TimeFrame = {
  start?: string
  end?: string
}

export type CashAccountsQueryModel = TimeFrame & { transactions?: 'true' | 'false' }

export type CashAccountWithTotals = CashAccount & {
  account: Account
  totals: Record<AccountTotalType, number>
}

export type CashAccountWithTotalsAndTransactions = CashAccount & {
  paymentFromAccount: Transaction
  paymentToAccount: Transaction
}

export type AccountTotalType = 'income' | 'expense' | 'transferIn' | 'transferOut' | 'net' | 'transferNet' | 'balance'

export type groupedAccount = (Prisma.PickArray<Prisma.TransactionGroupByOutputType, ('type' | 'fromAccountId' | 'toAccountId')[]> & {
  _sum: {
    amount: number | null
  }
})

