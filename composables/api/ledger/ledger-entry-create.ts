import type { Prisma, User } from '@prisma/client'
import { useMutation, useQueryClient } from 'vue-query'

export const useLedgerEntryCreate = () => {
  const queryClient = useQueryClient()

  return useMutation((body: Prisma.UserCreateInput) =>
    $fetch<User>('/api/ledger', {
      method: 'POST',
      body,
    }),
  {
    onSuccess: (kajgod: any) => {
      console.log('entry create onSuccess :>> ', kajgod)
      queryClient.invalidateQueries('ledger-entries')
    },
  })
}
