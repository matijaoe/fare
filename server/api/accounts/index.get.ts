import { prisma } from '~/prisma'
import { sendInternalError } from '~~/composables/api'

export default defineEventHandler((event) => {
  try {
    return prisma.account.findMany({
      include: {
        user: true,
        CashAccount: {
          include: {
            paymentFromAccount: true,
            paymentToAccount: true,
          },
        },
        InvestmentAccount: true,
      },
    })
  } catch (err) {
    console.error(err)
    sendInternalError(event, err)
  }
})
