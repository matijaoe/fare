import type { Transaction, TransactionType } from '@prisma/client'
import type { MaybeRef } from '@vueuse/core'

export const useTransactionData = (transaction: MaybeRef<Transaction>) => {
  const isType = (type: TransactionType) => type === (isRef(transaction) ? transaction.value.type : transaction.type)

  const isExpense = computed(() => isType('Expense'))
  const isIncome = computed(() => isType('Income'))
  const isTransfer = computed(() => isType('Transfer'))

  return {
    isType,
    isExpense,
    isIncome,
    isTransfer,
  }
}
