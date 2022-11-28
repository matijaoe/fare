export const useNetWorth = () => {
  const { data: cashBalance, isLoading: isLoadingCashBalance } = useCashAccountsBalance()
  const { data: investmentsBalance, isLoading: isLoadingInvestmentsBalance } = useInvestmentsBalance()

  const netWorth = computed(() => (cashBalance.value?.balance ?? 0) + (investmentsBalance.value?.balance ?? 0))
  const isLoading = computed(() => isLoadingCashBalance.value || isLoadingInvestmentsBalance.value)

  const netWorthFormatted = useCurrencyFormat(netWorth)

  return { netWorth, netWorthFormatted, isLoading }
}
