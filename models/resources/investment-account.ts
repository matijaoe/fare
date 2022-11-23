import type { InvestmentAccount, InvestmentEntry, MoneyAccount } from '@prisma/client'

export type InvestmentAccountWithAccount = InvestmentAccount & { account: MoneyAccount }

export type InvestmentAccountWithEntries = {
  investmentAccountId: string
  accountId: string
  balances: Record<string, InvestmentAccountEntries>
}

export type InvestmentAccountEntries = Record<string, InvestmentEntry>
