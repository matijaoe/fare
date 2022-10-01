import type { Ledger } from '@prisma/client'
import { useQuery } from 'vue-query'

type TimeFrame = {
  start: string
  end: string
}

export const useLedgerEntry = (id: string) => useQuery('ledger-entry', () => $fetch<Ledger[]>(`/api/ledger/${id}`))
