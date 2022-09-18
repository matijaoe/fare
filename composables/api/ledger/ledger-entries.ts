import type { Ledger } from '@prisma/client'
import { useQuery } from 'vue-query'

type TimeFrame = {
  start: string
  end: string
}

export const useLedgerEntries = (timeframe: TimeFrame) => useQuery('ledger-entries', () => $fetch<Ledger[]>('/api/ledger', {
  params: timeframe,
}))
