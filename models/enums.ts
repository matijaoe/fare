import type { InvestmentType as InvestmentTypeOrigin, TransactionType as TransactionTypeOrigin } from '@prisma/client'

// https://github.com/prisma/prisma/issues/12504
// Re-export enum for runtime
export const TransactionTypeConst = {
  Income: 'Income',
  Expense: 'Expense',
  Transfer: 'Transfer',
} satisfies Record<TransactionTypeOrigin, TransactionTypeOrigin>

export const InvestmentTypeConst = {
  Stocks: 'Stocks',
  Crypto: 'Crypto',
  Property: 'Property',
  Other: 'Other',
} satisfies Record<InvestmentTypeOrigin, InvestmentTypeOrigin>

export type TransactionType = (typeof TransactionTypeConst)[keyof typeof TransactionTypeConst]
export type InvestmentType = (typeof InvestmentTypeConst)[keyof typeof InvestmentTypeConst]

// export type TransactionType = 'Income' | 'Expense' | 'Transfer'
// export type CashAccountType = 'Cash' | 'Savings'
// export type InvestmentType = 'Stocks' | 'Crypto' | 'Property' | 'Other'
