import type { Account, CashAccount, Prisma, Transaction } from '@prisma/client'

export type DateRange = {
  from?: string
  to?: string
}

export type CashAccountsQueryModel = DateRange & { transactions?: 'true' | 'false' }

export type CashAccountWithAccount = CashAccount & { account: Account }

export type AccountTotals = Record<AccountTotalType, number>

export type CashAccountWithTotals = CashAccount & {
  totals: AccountTotals
  timestamp: number
}

export type CashAccountWithTotalsAndAccount = CashAccountWithAccount & {
  totals: AccountTotals
  timestamp?: number
}

export type CashAccountWithTotalsAndTransactions = CashAccount & {
  paymentFromAccount: Transaction
  paymentToAccount: Transaction
}

export type CashAccountsBalanceModel = { balance: number }

export type AccountTotalType = 'income' | 'expense' | 'transferIn' | 'transferOut' | 'net' | 'transferNet' | 'balance'

export type GroupedAccount = (Prisma.PickArray<Prisma.TransactionGroupByOutputType, ('type' | 'fromAccountId' | 'toAccountId')[]> & {
  _sum: {
    amount: number | null
  }
})

