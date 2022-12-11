import type { Prisma, User } from '@prisma/client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import type { MaybeRef } from '@vueuse/core'

export const keysUsers = {
  all: ['users'] as const,
  single: (id: MaybeRef<string | undefined>) => ['users', id] as const,
}

export const useUsers = () => useQuery(
  keysUsers.all,
  () => $fetch<User[]>('/api/users'),
)

export const useUser = (id: MaybeRef<string | undefined>) => useQuery(
  keysUsers.single(id),
  () => $fetch<User>(`/api/users/${unref(id)}`),
)

export const useUserUpdate = (id: MaybeRef<string | undefined>) => {
  const qc = useQueryClient()
  return useMutation(
    (data: Prisma.UserUncheckedUpdateInput) => $fetch<User>(`/api/users/${unref(id)}`, {
      method: 'PATCH',
      body: {
        ...data,
        id: unref(id),
      },
    }),
    {
      onSuccess: () => {
        qc.invalidateQueries(keysUsers.all)
        qc.invalidateQueries(keysUsers.single(id))
      },
    },
  )
}
