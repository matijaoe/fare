export const useNetWorth = () => {
  const { data: cashBalanceObj, isLoading: isLoadingCashBalance } = useCashAccountsBalance()
  const { data: investmentsBalanceObj, isLoading: isLoadingInvestmentsBalance } = useInvestmentsBalance()

  const cashBalance = computed(() => cashBalanceObj.value?.balance ?? 0)
  const investmentsBalance = computed(() => investmentsBalanceObj.value?.balance ?? 0)

  const netWorth = computed(() => cashBalance.value + investmentsBalance.value)

  const formattedNetWorth = useCurrencyFormat(netWorth)
  const formattedCashBalance = useCurrencyFormat(cashBalance)
  const formattedInvestmentsBalance = useCurrencyFormat(investmentsBalance)

  const isLoading = computed(() => isLoadingCashBalance.value || isLoadingInvestmentsBalance.value)

  return {
    isLoading,
    // formatted
    formattedNetWorth,
    formattedCashBalance,
    formattedInvestmentsBalance,
    // raw
    cashBalance,
    investmentsBalance,
    netWorth,
  }
}
