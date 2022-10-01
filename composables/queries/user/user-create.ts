import type { Prisma, User } from '@prisma/client'
import { useMutation, useQueryClient } from 'vue-query'

export const useUserCreate = () => {
  const queryClient = useQueryClient()

  return useMutation((body: Prisma.UserCreateInput) =>
    $fetch<User>('/api/users', {
      method: 'POST',
      body,
    }),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('users')
    },
  })
}
