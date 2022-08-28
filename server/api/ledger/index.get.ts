import { prisma } from '~~/prisma'

export default defineEventHandler((event) => {
  const { start, end } = useQuery(event) as { start: string; end: string }

  const startDate = new Date(start)
  const endDate = new Date(end)

  return prisma.ledger.findMany({
    where: {
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
  })
})
