import type { Account, CashAccount, Ledger, Prisma } from '@prisma/client'

export type CashAccountWithTotals = CashAccount & {
  account: Account
  totals: Record<AccountTotalType, number>
}

export type CashAccountWithTotalsAndTransactions = CashAccount & {
  paymentFromAccount: Ledger
  paymentToAccount: Ledger
}

export type AccountTotalType = 'income' | 'expense' | 'transferIn' | 'transferOut' | 'net' | 'transferNet' | 'balance'

export type groupedAccount = (Prisma.PickArray<Prisma.LedgerGroupByOutputType, ('type' | 'fromAccountId' | 'toAccountId')[]> & {
  _sum: {
    amount: number | null
  }
})
