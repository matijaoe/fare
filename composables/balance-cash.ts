export const useBalanceCash = () => {
  const { monthQuery } = toRefs(useDateRangeStore())

  const { data: totalBalance, isLoading: isBalanceLoading } = useCashAccountsBalance()
  const { data: monthlyBalanceObj, isLoading: isMonthlyBalanceLoading } = useCashAccountsMonthlyBalance(monthQuery)

  const balance = computed(() => totalBalance.value?.balance ?? 0)
  const monthlyBalance = computed(() => monthlyBalanceObj.value?.balance ?? 0)

  const formattedTotalBalance = useCurrencyFormat(balance)
  const formattedMonthlyBalance = useCurrencyFormat(monthlyBalance)

  return {
    balance,
    monthlyBalance,
    formattedTotalBalance,
    formattedMonthlyBalance,
    isBalanceLoading,
    isMonthlyBalanceLoading,
  }
}
