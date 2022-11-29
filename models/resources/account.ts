import type { CashAccount, MoneyAccount, Prisma } from '@prisma/client'
import type { TransactionWithCategoryAndCashAccount } from './transaction'

const initalTotal = { income: 0, expense: 0, transferIn: 0, transferOut: 0, net: 0, transferNet: 0 }

export type AccountTotalType = keyof typeof initalTotal

export type CashAccountWithAccount = CashAccount & { account: MoneyAccount }

export type CashAccountWithAccountAndTransactionsWithCategoryAndCashAccount = CashAccount & { account: MoneyAccount; paymentFromAccount: TransactionWithCategoryAndCashAccount[]; paymentToAccount: TransactionWithCategoryAndCashAccount[] }

// Account totals and account balance
export type AccountTotals = Record<AccountTotalType, number>

export type CashAccountWithTotals = CashAccount & { totals: AccountTotals }
export type IndividualCashAccountTotals = { id: string; totals: AccountTotals }

export type CashAccountWithBalance = CashAccount & { balance: number }
export type IndividualCashAccountWithBalance = { id: string; balance: number }

// Total balance of all accounts
export type CashAccountsBalanceModel = {
  balance: number
  snapshotDate: Date
  monthQuery?: string
}

export type GroupedAccount = (Prisma.PickArray<Prisma.TransactionGroupByOutputType, ('type' | 'fromAccountId' | 'toAccountId')[]> & {
  _sum: {
    amount: number | null
  }
})

