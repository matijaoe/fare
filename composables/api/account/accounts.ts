import type { Account } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useAccounts = () => useQuery('accounts', () => $fetch<Account[]>('/api/accounts'))
