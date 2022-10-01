import type { User } from '@prisma/client'
import { useQuery } from 'vue-query'

export const useUsers = () => useQuery('users', () => $fetch<User[]>('/api/users'))
