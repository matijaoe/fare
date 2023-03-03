import type { InvestmentType } from '~~/models/enums'

export const useNestEgg = () => {
  const { monthQuery } = toRefs(useDateRangeStore())

  const { data: totalBalance, isLoading: isBalanceLoading } = useInvestmentsBalance()
  const { data: monthlyBalanceObj, isLoading: isMonthlyBalanceLoading } = useInvestmentsMonthlyBalance(monthQuery)

  // Total nest egg balance
  const balance = computed(() => totalBalance.value?.balance ?? 0)
  // Monthly balance
  const monthlyBalance = computed(() => monthlyBalanceObj.value?.balance ?? 0)

  const formattedTotalBalance = useCurrencyFormat(balance)
  const formattedMonthlyBalance = useCurrencyFormat(monthlyBalance)

  // Account data and account entries
  const { data: investmentAccounts, isLoading: isAccountsLoading } = useInvestmentAccounts()
  const { data: investmentEntries, isLoading: isEntriesLoading } = useInvestmentAccountsEntries()

  const investmentAccountsCount = computed(() => investmentAccounts.value?.length ?? 0)

  const getAccountMonthlyBalances = (investmentAccountId: string) => {
    const acc = investmentEntries.value?.find(acc => acc.investmentAccountId === investmentAccountId)
    return acc?.balances ?? {}
  }

  const accountsWithMonthlyBalances = computed(() => {
    return investmentAccounts.value?.map((account) => {
      const balances = getAccountMonthlyBalances(account.id)

      const [latestBalanceEntry] = Object.values(balances).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      const latestBalance = latestBalanceEntry?.balance ?? 0

      return { ...account, balances, totalBalance: latestBalance }
    }) ?? []
  })

  const getAccountsForType = (type: InvestmentType) => accountsWithMonthlyBalances.value?.filter(acc => acc.type === type) ?? []

  const averageAnnualRate = computed(() => {
    const multiplied = accountsWithMonthlyBalances.value.reduce((acc, curr) => {
      return acc + (curr.expectedRateOfReturn * curr.totalBalance)
    }, 0)

    const result = (multiplied / balance.value) / 100
    return isNaN(result) ? 0 : result
  })

  const averageMonthlyRate = computed(() => averageAnnualRate.value / 12)

  const formattedAverageAnnualRate = computed(() => averageAnnualRate.value ? formatPercentage(averageAnnualRate.value) : null)

  return {
    formattedMonthlyBalance,
    formattedTotalBalance,
    isBalanceLoading,
    isMonthlyBalanceLoading,
    isAccountsLoading,
    isEntriesLoading,
    accountsWithMonthlyBalances,
    getAccountsForType,
    averageAnnualRate,
    averageMonthlyRate,
    formattedAverageAnnualRate,
    investmentAccountsCount,
    balance,
    monthlyBalance,
  }
}
