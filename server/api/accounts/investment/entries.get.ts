import { StatusCodes } from 'http-status-codes'
import { readUserId, sendCustomError, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'
import { getYearMonthKey } from '~~/utils'

export default defineEventHandler(async (event) => {
  const userId = readUserId(event)
  if (!userId) {
    return sendCustomError(event, StatusCodes.UNAUTHORIZED, 'No userId')
  }

  try {
    const allAccounts = await db.investmentAccount.findMany({
      where: { account: { userId } },
    })

    const investmentAccountBalances = await db.investmentEntry.findMany({
      where: { account: { account: { userId } } },
    })

    const resultAccounts = allAccounts.map((account) => {
      const balancesObj = investmentAccountBalances
        .filter(({ investmentAccountId }) => investmentAccountId === account.id)
        .reduce((acc, balance) => {
          const dateKey = getYearMonthKey(balance.date)
          if (!acc[dateKey]) {
            acc[dateKey] = []
          }
          acc[dateKey]?.push(balance)
          acc[dateKey].sort((a, b) => b.date.getTime() - a.date.getTime())
          return acc
        }, {} as Record<string, { balance: number; date: Date }[]>)

      const balancesObjWithLatestOnly = Object.entries(balancesObj).reduce((acc, [key, balances]) => {
        acc[key] = balances[0]
        return acc
      }, {} as Record<string, { balance: number; date: Date }>)

      return {
        investmentAccountId: account.id,
        accountId: account.accountId,
        balances: balancesObjWithLatestOnly,
      }
    })

    return resultAccounts
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
