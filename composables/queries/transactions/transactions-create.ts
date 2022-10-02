import type { Prisma, User } from '@prisma/client'
import { useMutation, useQueryClient } from 'vue-query'

export const useTransactionCreate = () => {
  const queryClient = useQueryClient()

  return useMutation((body: Prisma.TransactionUncheckedCreateWithoutUserInput) =>
    $fetch<User>('/api/transactions', {
      method: 'POST',
      body,
    }),
  {
    onSuccess: () => {
      queryClient.invalidateQueries('transactions')
    },
  })
}
