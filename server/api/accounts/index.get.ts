import { prisma } from '~/prisma'

export default defineEventHandler((event) => {
  try {
    return prisma.account.findMany({
      include: {
        CashAccount: true,
        InvestmentAccount: true,
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
