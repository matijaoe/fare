import { prisma } from '~/prisma'
import { useErrorRes } from '~~/composables/api'

export default defineEventHandler((event) => {
  try {
    // TODO
    return prisma.account.findMany()
  } catch (err) {
    console.error(err)
    return useErrorRes(event, err)
  }
})
