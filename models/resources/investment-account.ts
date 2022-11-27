import type { InvestmentAccount, InvestmentEntry, MoneyAccount, Prisma } from '@prisma/client'

export type InvestmentAccountWithAccount = InvestmentAccount & { account: MoneyAccount }

export type InvestmentAccountWithEntries = {
  investmentAccountId: string
  accountId: string
  balances: Record<string, InvestmentEntry>
}

export type InvestmentAccoundUpdateReq = { account: Prisma.MoneyAccountUncheckedUpdateManyInput } & Prisma.InvestmentAccountUncheckedUpdateManyInput

export type InvestmentsBalance = {
  balance: number
  snapshotDate: Date
  monthQuery?: string
}
