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

export const useNetWorthMonthly = () => {
  const { monthQuery } = toRefs(useDateRangeStore())

  const { data: cashBalanceObj, isLoading: isLoadingCashBalance } = useCashAccountsMonthlyBalance(monthQuery)
  const { data: investmentsBalanceObj, isLoading: isLoadingInvestmentsBalance } = useInvestmentsMonthlyBalance(monthQuery)

  const cashBalance = computed(() => cashBalanceObj.value?.balance ?? 0)
  const investmentsBalance = computed(() => investmentsBalanceObj.value?.balance ?? 0)

  const netWorth = computed(() => cashBalance.value + investmentsBalance.value)

  const formattedNetWorth = useCurrencyFormat(netWorth)
  const formattedCashBalance = useCurrencyFormat(cashBalance)
  const formattedInvestmentsBalance = useCurrencyFormat(investmentsBalance)

  const isLoading = computed(() => isLoadingCashBalance.value || isLoadingInvestmentsBalance.value)

  return {
    isLoading,
    formattedNetWorth,
    formattedCashBalance,
    formattedInvestmentsBalance,
    cashBalance,
    investmentsBalance,
    netWorth,
  }
}
