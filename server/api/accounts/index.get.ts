import { prisma } from '~/prisma'
import { sendInternalError } from '~~/composables/api'

export default defineEventHandler((event) => {
  try {
    return prisma.account.findMany({
      include: {
        user: true,
        CashAccount: true,
        InvestmentAccount: true,
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
