import { readUserId, sendInternalError } from '~~/server/utils'
import { db } from '~~/lib/db'
import { getYearMonthKey } from '~~/utils'

// Get cash accounts, with transactions only from given month range
export default defineEventHandler(async (event) => {
  // TODO: temp disable
  // const userId = readUserId(event)
  // if (!userId) {
  //   return null
  // }

  try {
    const allAccounts = await db.investmentAccount.findMany({
      where: {
        // userId,
      },
    })

    const investmentAccountBalances = await db.investmentEntry.findMany({
      where: {
        // userId
      },
    })

    console.log('🍉🍉🍉🍉 investmentAccountBalances :>> ', investmentAccountBalances)

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
        ...account,
        balances: balancesObjWithLatestOnly,
      }
    })

    return resultAccounts
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
